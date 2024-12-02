
#PowerShell Generate DataFiles of Github Repositories
#Using python & pygithub

$config = Get-Content -Path './config.json'| ConvertFrom-Json

$tokenArray = $config.tokens
foreach ($token in $tokenArray) {
  python ./data/token-generator.py --token=$token --json=./data/token.json
}

$userArray = $config.users
foreach ($user in $userArray) {
  python ./data/public-generator.py --user=$user --json=./data/user.json
}