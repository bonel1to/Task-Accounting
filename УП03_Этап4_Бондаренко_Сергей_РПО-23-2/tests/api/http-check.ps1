$ErrorActionPreference = "Stop"

$baseUrl = "https://bonel1to.github.io/Task-Accounting"
$reportPath = Join-Path (Get-Location) "reports\api_test_report.txt"

$checks = @(
  @{ Name = "Main page"; Url = "$baseUrl/"; Expected = 200 },
  @{ Name = "CSS asset"; Url = "$baseUrl/styles.css"; Expected = 200 },
  @{ Name = "JS asset"; Url = "$baseUrl/script.js"; Expected = 200 },
  @{ Name = "Missing asset"; Url = "$baseUrl/not-found-file.js"; Expected = 404 }
)

function Get-HttpStatus {
  param(
    [string]$Url,
    [int]$TimeoutSec = 45
  )

  try {
    $response = Invoke-WebRequest -Uri $Url -UseBasicParsing -TimeoutSec $TimeoutSec
    return [int]$response.StatusCode
  } catch {
    if ($_.Exception.Response) {
      return [int]$_.Exception.Response.StatusCode.value__
    }
    throw
  }
}

if (-not (Test-Path "reports")) {
  New-Item -ItemType Directory -Force -Path "reports" | Out-Null
}

$lines = @(
  "Task-Accounting HTTP/API adapted checks",
  "Date: $(Get-Date)",
  "Base URL: $baseUrl",
  ""
)

foreach ($check in $checks) {
  $status = $null
  $lastError = $null

  for ($attempt = 1; $attempt -le 2; $attempt++) {
    try {
      $status = Get-HttpStatus -Url $check.Url
      $lastError = $null
      break
    } catch {
      $lastError = $_.Exception.Message
      Start-Sleep -Seconds 2
    }
  }

  if ($null -eq $status) {
    $line = "{0}: {1} -> request failed: {2}" -f $check.Name, $check.Url, $lastError
    Write-Host $line
    $lines += $line
    $lines | Set-Content $reportPath -Encoding UTF8
    exit 1
  }

  $line = "{0}: {1} -> HTTP {2}, expected {3}" -f $check.Name, $check.Url, $status, $check.Expected
  Write-Host $line
  $lines += $line

  if ($status -ne $check.Expected) {
    $lines | Set-Content $reportPath -Encoding UTF8
    exit 1
  }
}

$lines += ""
$lines += "HTTP checks passed."
$lines | Set-Content $reportPath -Encoding UTF8
