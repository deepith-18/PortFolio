# Automated deploy script from Portfolio to deepith-18.github.io (deepith.me)
$ErrorActionPreference = "Stop"

Write-Host ">>> 1/4: Building production bundle..." -ForegroundColor Cyan
npm run build

Write-Host ">>> 2/4: Ensuring CNAME is present..." -ForegroundColor Cyan
Set-Content -Path ".\build\CNAME" -Value "deepith.me"

Write-Host ">>> 3/4: Copying build files to C:\Host\deepith-18.github.io..." -ForegroundColor Cyan
Copy-Item -Path ".\build\*" -Destination "C:\Host\deepith-18.github.io" -Recurse -Force

Write-Host ">>> 4/4: Committing and pushing to GitHub Pages..." -ForegroundColor Cyan
git -C "C:\Host\deepith-18.github.io" add .
$status = git -C "C:\Host\deepith-18.github.io" status --porcelain
if ($status) {
    git -C "C:\Host\deepith-18.github.io" commit -m "Deploy latest portfolio build"
    git -C "C:\Host\deepith-18.github.io" push origin main
    Write-Host "Deployment successfully pushed to GitHub Pages!" -ForegroundColor Green
} else {
    Write-Host "No changes to deploy." -ForegroundColor Yellow
}
