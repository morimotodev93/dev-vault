param(
    [Parameter(Mandatory = $true)]
    [string]$Name,

    [string]$Path = "src/components"
)

$ComponentPath = Join-Path $Path $Name

if (Test-Path $ComponentPath) {
    Write-Error "Component already exists: $ComponentPath"
    exit 1
}

New-Item -ItemType Directory -Path $ComponentPath | Out-Null

@"
export function $Name() {
  return <div>$Name</div>;
}
"@ | Set-Content "$ComponentPath/$Name.tsx"

@"
.$($Name.Substring(0,1).ToLower())$($Name.Substring(1)) {
}
"@ | Set-Content "$ComponentPath/$Name.module.css"

@"
export { $Name } from "./$Name";
"@ | Set-Content "$ComponentPath/index.ts"

Write-Host "Created: $ComponentPath"
