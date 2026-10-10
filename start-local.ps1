$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $MyInvocation.MyCommand.Path
$base = Join-Path $root 'tools\mysql-8.4.11-winx64'
$data = Join-Path $root 'data\mysql'
$bin = Join-Path $base 'bin'
$port = 3307
$sitePort = 4175
$cfg = @{}
Get-Content (Join-Path $root '.env') | ForEach-Object { if ($_ -match '^\s*([^#=]+)=(.*)$') { $cfg[$Matches[1]] = $Matches[2] } }
$sitePort = if ($cfg.PORT) { [int]$cfg.PORT } else { 4175 }
$env:MYSQL_PWD = $cfg.DB_PASSWORD
$mysqlReady = Get-NetTCPConnection -LocalAddress 127.0.0.1 -LocalPort $port -State Listen -ErrorAction SilentlyContinue
if (-not $mysqlReady) {
  Start-Process -FilePath (Join-Path $bin 'mysqld.exe') -ArgumentList @("--basedir=$base", "--datadir=$data", "--port=$port", '--bind-address=127.0.0.1', '--mysqlx=0', '--console') -WindowStyle Hidden -RedirectStandardOutput (Join-Path $root 'data\mysql-server.log') -RedirectStandardError (Join-Path $root 'data\mysql-error.log')
  $ready = $false
  for ($i=0; $i -lt 120; $i++) {
    Start-Sleep -Seconds 1
    if (Get-NetTCPConnection -LocalAddress 127.0.0.1 -LocalPort $port -State Listen -ErrorAction SilentlyContinue) { $ready = $true; break }
  }
  if (-not $ready) { throw 'O banco MySQL local não iniciou. Confira data\mysql-error.log.' }
}
$siteReady = Get-NetTCPConnection -LocalAddress 127.0.0.1 -LocalPort $sitePort -State Listen -ErrorAction SilentlyContinue
if (-not $siteReady) {
  $node = (Get-Command node.exe).Source
  $envFile = Join-Path $root '.env'
  $serverFile = Join-Path $root 'backend\server.js'
  Start-Process -FilePath $node -ArgumentList @("--env-file=$envFile", $serverFile) -WorkingDirectory $root -WindowStyle Hidden -RedirectStandardOutput (Join-Path $root 'data\site.log') -RedirectStandardError (Join-Path $root 'data\site-error.log')
  $ready = $false
  for ($i=0; $i -lt 30; $i++) {
    Start-Sleep -Seconds 1
    try { $health = Invoke-RestMethod "http://127.0.0.1:$sitePort/api/health" -TimeoutSec 2; if ($health.ok) { $ready = $true; break } } catch {}
  }
  if (-not $ready) { throw 'O site não iniciou. Confira data\site-error.log.' }
}
Start-Process "http://127.0.0.1:$sitePort"
Write-Host "HeroBoxd aberto em http://127.0.0.1:$sitePort"
