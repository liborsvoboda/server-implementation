using System.Diagnostics;
using System.Reflection;
using System.Text;
using DocFxMarkdownGen;
using Microsoft.Extensions.Logging;
using ServiceStack;
using YamlDotNet.Serialization;
using YamlDotNet.Serialization.NamingConventions;

using ILoggerFactory loggerFactory =
    LoggerFactory.Create(builder =>
        builder.AddSimpleConsole(options =>
        {
            options.IncludeScopes = true;
            options.SingleLine = true;
            options.TimestampFormat = "hh:mm:ss ";
        }));

var logger = loggerFactory.CreateLogger<Program>();

var versionString = Assembly.GetEntryAssembly()?
    .GetCustomAttribute<AssemblyInformationalVersionAttribute>()?
    .InformationalVersion ?? Assembly.GetExecutingAssembly().GetName().Version?.ToString();


var yamlDeserializer = new DeserializerBuilder().WithNamingConvention(CamelCaseNamingConvention.Instance)
    .IgnoreUnmatchedProperties().Build();
var config =
    yamlDeserializer.Deserialize<Config>(
        await File.ReadAllTextAsync(Environment.GetEnvironmentVariable("DFMG_CONFIG") ?? "./config.yaml"));
config.IndexSlug ??= "/api";
if (Directory.Exists(config.OutputPath))
    Directory.Delete(config.OutputPath, true);
Directory.CreateDirectory(config.OutputPath);

var stopwatch = Stopwatch.StartNew();
Dictionary<string, Item> items = new();

// read all yaml and create directory structure
await Parallel.ForEachAsync(Directory.GetFiles(config.YamlPath, "*.yml"), async (file, _) =>
{
    if (file.EndsWith("toc.yml"))
        return;
    logger.LogDebug(file);
    var obj = yamlDeserializer.Deserialize<DocFxFile>(await File.ReadAllTextAsync(file));
    lock (items)
    {
        foreach (var item in obj.Items)
        {
            items.Add(item.Uid, item);
        }
    }
});
logger.LogInformation($"Read all YAML in {stopwatch.ElapsedMilliseconds}ms.");
// create namespace directories
await Parallel.ForEachAsync(items, async (kvp, _) =>
{
    var item = kvp.Value;
    if (item.Type == "Namespace")
    {
        logger.LogDebug($"{item.Type}:{item.Name}");
        var dir = Path.Combine(config.OutputPath, item.Name);
        Directory.CreateDirectory(dir);
    }
});

logger.LogInformation("Generating and writing markdown...");
stopwatch.Restart();
// create type files finally
await Parallel.ForEachAsync(items, async (kvp, _) =>
{
    var item = kvp.Value;
    if (item.CommentId.StartsWith("T:"))
    {
        var str = new StringBuilder();
        str.AppendLine("---");
        str.AppendLine("title: " + item.Type + " " + item.Name);
        str.AppendLine("sidebar_label: " + item.Name);
        if (item.Summary != null)
            // todo: run a regex replace to get rid of hyperlinks and inline code blocks?
            str.AppendLine($"description: \"{item.GetSummary(items,item.Summary)?.Trim().Replace("\"", "\\\"")}\"");
        str.AppendLine("---");
        str.AppendLine();
        if (config.UseIconify)
        {
            str.AppendLine("import { Icon } from '@iconify/react';");
            str.AppendLine();
        }
        
        str.AppendLine(item.WithIconifyHeading("# "));
        str.AppendLine(item.GetSummary(items,item.Summary)?.Trim());
        str.AppendLine();
        str.AppendLine($"###### **Assembly**: {item.Assemblies[0]}.dll");
        MarkdownWritingExtensions.Declaration(str, item);
        // Properties
        var properties = items.GetProperties(item.Uid);
        if (properties.Length != 0)
        {
            str.AppendLine("## Properties");
            foreach (var property in properties)
            {
                if(config.UseIconify)
                    str.AppendLine(property.WithIconifyHeading());
                else
                    str.AppendLine($"### {property.Name}");
                str.AppendLine(item.GetSummary(items,property.Summary)?.Trim());
                MarkdownWritingExtensions.Declaration(str, property);
            }
        }

        // Inherited Properties
        var inheritedProperties = items.GetInheritedProperties(item.Uid);
        if (inheritedProperties.Length > 0)
        {
            str.AppendLine("## Inherited Properties");
            foreach (var property in inheritedProperties)
            {
                if(config.UseIconify)
                    str.AppendLine(property.WithIconifyHeading());
                else
                    str.AppendLine($"### {property.Name}");
                str.AppendLine(item.GetSummary(items,property.Summary)?.Trim());
                MarkdownWritingExtensions.Declaration(str, property);
            }
        }


        // Fields
        var fields = items.GetFields(item.Uid);
        if (fields.Length != 0)
        {
            str.AppendLine("## Fields");
            foreach (var field in fields)
            {
                str.AppendLine(config.UseIconify ? field.WithIconifyHeading() : $"### {field.Name}");
                str.AppendLine(item.GetSummary(items,field.Summary)?.Trim());
                MarkdownWritingExtensions.Declaration(str, field);
            }
        }

        // Methods
        var methods = items.GetMethods(item.Uid);
        if (methods.Length != 0)
        {
            str.AppendLine("## Methods");
            foreach (var method in methods)
            {
                /// write method details
                items.MethodSummary(str, method, config);
            }
        }

        var inheritedMethods = items.GetInheritedMethods(item.Uid);
        if (inheritedMethods.Length > 0)
        {
            str.AppendLine("## Inherited Methods");
            foreach (var inheritedMethod in inheritedMethods)
            {
                items.MethodSummary(str, inheritedMethod, config);
            }
        }

        // Events
        var events = items.GetEvents(item.Uid);
        if (events.Length != 0)
        {
            str.AppendLine("## Events");
            foreach (var @event in events)
            {
                str.AppendLine($"### {@event.Name.HtmlEscape()}");
                str.AppendLine(item.GetSummary(items,@event.Summary)?.Trim());
                MarkdownWritingExtensions.Declaration(str, @event);
                str.AppendLine("##### Event Type");
                if (@event.Syntax.Return.Description == null)
                    str.AppendLine(items.Link(@event.Syntax.Return.Type)?.Trim());
                else
                    str.AppendLine(items.Link(@event.Syntax.Return.Type)?.Trim() + ": " +
                                   @event.Syntax.Return.Description);
            }
        }

        // Implements
        if (item.Implements?.Any() ?? false)
        {
            str.AppendLine();
            str.AppendLine("## Implements");
            str.AppendLine();
            foreach (var implemented in item.Implements)
            {
                str.AppendLine($"* {items.Link(implemented)}");
            }
        }

        await File.WriteAllTextAsync(
            Path.Join(config.OutputPath, item.Namespace, item.Name.Replace('<', '`').Replace('>', '`')) + ".md",
            str.ToString());
    }
    else if (item.Type == "Namespace")
    {
        var str = new StringBuilder();
        str.AppendLine("---");
        str.AppendLine("title: " + item.Type + " " + item.Name);
        str.AppendLine($"sidebar_label: {item.Name.HtmlEscape()}");
        str.AppendLine("sidebar_position: 0");
        str.AppendLine("---");
        if (config.UseIconify)
        {
            str.AppendLine("import { Icon } from '@iconify/react';");
            str.AppendLine();
        }
        str.AppendLine($"# Namespace {item.Name.HtmlEscape()}");

        void Do(string type, string header)
        {
            var @where = items.Values.Where(i => i.Namespace == item.Name && i.Type == type);
            if (@where.Any())
            {
                str.AppendLine($"## {header}");
                foreach (var item1 in @where.OrderBy(i => i.Name))
                {
                    str.AppendLine($"### {items.Link(item1.Uid, config, true)}");
                    str.AppendLine(item1.GetSummary(items,item1.Summary)?.Trim());
                }
            }
        }

        Do("Class", "Classes");
        Do("Struct", "Structs");
        Do("Interface", "Interfaces");
        Do("Enum", "Enums");

        await File.WriteAllTextAsync(Path.Join(config.OutputPath, item.Name, $"{item.Name}.md"), str.ToString());
    }
});
// generate index page
{
    var str = new StringBuilder();
    str.AppendLine("---");
    str.AppendLine("title: Index");
    str.AppendLine("sidebar_label: Index");
    str.AppendLine("sidebar_position: 0");
    str.AppendLine($"slug: {config.IndexSlug}");
    str.AppendLine("---");
    str.AppendLine("# API Index");
    str.AppendLine("## Namespaces");
    foreach (var @namespace in items.Values.Where(i => i.Type == "Namespace").OrderBy(i => i.Name))
        str.AppendLine($"* {items.Link(@namespace.Uid, indexLink: true).HtmlEscape()}");
    str.AppendLine();
    str.AppendLine("---");
    str.AppendLine();
    await File.WriteAllTextAsync(Path.Join(config.OutputPath, $"index.md"), str.ToString());
}
logger.LogInformation($"Markdown finished in {stopwatch.ElapsedMilliseconds}ms.");

if (config.OutputStats)
{
    var namespaces = items.Values.Count(x => x.Type == "Namespace");
    var classes = items.Values.Count(x => x.Type == "Class");
    var structs = items.Values.Count(x => x.Type == "Struct");
    var interfaces = items.Values.Count(x => x.Type == "Interface");
    var enums = items.Values.Count(x => x.Type == "Enum");

    var classesByNamespace = items.Values.Where(x => x.Type == "Class")
        .GroupBy(y => y.Assemblies[0]);
    
    var structsByNamespace = items.Values.Where(x => x.Type == "Struct")
        .GroupBy(y => y.Assemblies[0]);
    
    var enumsByNamespace = items.Values.Where(x => x.Type == "Enum")
        .GroupBy(y => y.Assemblies[0]);
    
    var interfacesByNamespace = items.Values.Where(x => x.Type == "Interface")
        .GroupBy(y => y.Assemblies[0]);

    var results = new CodeBaseStats
    {
        Namespaces = namespaces,
        Classes = classes,
        Structs = structs,
        Interfaces = interfaces,
        Enums = enums,
        ClassesByAssembly = classesByNamespace.ToDictionary(x => x.Key, y => y.Count()),
        StructsByAssembly = structsByNamespace.ToDictionary(x => x.Key, y => y.Count()),
        EnumsByAssembly = enumsByNamespace.ToDictionary(x => x.Key, y => y.Count()),
        InterfacesByAssembly = interfacesByNamespace.ToDictionary(x => x.Key, y => y.Count())
    };
    
    Console.WriteLine("Stats: ");
    Console.WriteLine(results.ToJson());
    File.WriteAllText("./stats.json", results.ToJson());
}