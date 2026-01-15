# PowerShell script to create complete project structure
# Save this as create-structure.ps1 and run it in your project root folder

Write-Host "Creating Product Showcase Backend Structure..." -ForegroundColor Green
Write-Host ""

# Define all folders
$folders = @(
    "src",
    "src/config",
    "src/types",
    "src/middlewares",
    "src/utils",
    "src/modules",
    "src/modules/category",
    "src/modules/product"
)

# Define all files
$files = @(
    "package.json",
    "tsconfig.json",
    ".env",
    ".env.example",
    ".gitignore",
    ".eslintrc.json",
    "README.md",
    "src/config/database.ts",
    "src/config/cloudinary.ts",
    "src/types/index.ts",
    "src/middlewares/auth.middleware.ts",
    "src/middlewares/error.middleware.ts",
    "src/utils/multer.utils.ts",
    "src/utils/cloudinary.utils.ts",
    "src/modules/category/category.model.ts",
    "src/modules/category/category.service.ts",
    "src/modules/category/category.controller.ts",
    "src/modules/category/category.validation.ts",
    "src/modules/category/category.routes.ts",
    "src/modules/product/product.model.ts",
    "src/modules/product/product.service.ts",
    "src/modules/product/product.controller.ts",
    "src/modules/product/product.validation.ts",
    "src/modules/product/product.routes.ts",
    "src/app.ts",
    "src/server.ts"
)

# Create folders
Write-Host "Creating folders..." -ForegroundColor Yellow
foreach ($folder in $folders) {
    if (!(Test-Path $folder)) {
        New-Item -ItemType Directory -Path $folder -Force | Out-Null
        Write-Host "  Created: $folder" -ForegroundColor Gray
    } else {
        Write-Host "  Already exists: $folder" -ForegroundColor DarkGray
    }
}

Write-Host ""

# Create empty files
Write-Host "Creating files..." -ForegroundColor Yellow
foreach ($file in $files) {
    if (!(Test-Path $file)) {
        New-Item -ItemType File -Path $file -Force | Out-Null
        Write-Host "  Created: $file" -ForegroundColor Gray
    } else {
        Write-Host "  Already exists: $file" -ForegroundColor DarkGray
    }
}

Write-Host ""
Write-Host "Project structure created successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "Summary:" -ForegroundColor Cyan
Write-Host "  Total folders: $($folders.Count)" -ForegroundColor White
Write-Host "  Total files: $($files.Count)" -ForegroundColor White
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "  1. Fill in the content for each file" -ForegroundColor White
Write-Host "  2. Run: npm install" -ForegroundColor White
Write-Host "  3. Update .env with your credentials" -ForegroundColor White
Write-Host "  4. Run: npm run dev" -ForegroundColor White
Write-Host ""