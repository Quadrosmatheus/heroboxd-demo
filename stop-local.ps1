$ErrorActionPreference = 'Stop'
$root = (Resolve-Path (Split-Path -Parent $MyInvocation.MyCommand.Path)).Path
$targets = @(
  @{ Port = 4175; Match = "$root\backend\server.js" },
  @{ Port = 3307; Match = "--datadir=$root\data\mysql" }
)
foreach ($target in $targets) {
  $listeners = Get-NetTCPConnection -LocalPort $target.Port -State Listen -ErrorAction SilentlyContinue
  foreach ($listener in $listeners) {
    $proc = Get-CimInstance Win32_Process -Filter "ProcessId=$($listener.OwningProcess)" -ErrorAction SilentlyContinue
    if ($proc -and $proc.CommandLine.Contains($target.Match)) {
      Stop-Process -Id $proc.ProcessId -Force
      Write-Host "Stopped HeroBoxd process on port $($target.Port)."
    }
  }
}
