if(Test-Path -Path './docfx') {
    ./docfx/docfx.exe metadata
} else {
    docfx metadata
}
Get-ChildItem './api/*.yml' | ForEach {
    (Get-Content $_) | ForEach {$_ -Replace 'git@github.com:ServiceStack/ServiceStack.git', 'https://github.com/ServiceStack/ServiceStack'} | Set-Content $_
}
cd markdowngen
dotnet publish -o ../out
cd ..
./out/DocFxMarkdownGen.exe
yarn install
$env:NODE_OPTIONS="--max-old-space-size=8192"
npm run build