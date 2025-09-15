# Avancement du projet AgentSpecial
## Backend
### Done
- Initialisation d'un projet .NET Core WEB-API 9.0.304
- Initialisation xUnit
- add .csproj Test et projet + reference xUnit
- Installation des packages EFCore et Tools .NET 9.0.8 SDK 12
- Installation des packages EFCore Identity 
- Installation des Packages EFCore MySql 9.0.8
- Installation des packages ASP.NET Core SwashBuckle 6.6.0
- Installation des packages ASP.NET Core Scalar 2.0.30
- Initialisation des StartUps et ApplicationDbContext
- Liaison SQL
- .env
- .gitignore
- build et fix all errors (build OKAY)
- Découper Program.cs dans ServiceConfigurator.cs
- Préparer la ApplicationDbContext.cs avec la base mini pour mon jeu
- ef Migration & ef Update
- UserDTO
- Player.cs
- IUserServices
- UserServices
- UserController
- LoginDTO
- RegisterDTO
- Creation du player dans la db
- IPlayerService.cs
- PlayerService.cs
- PlayerDTO.cs
- PlayerController.cs

### Access & Documentation API Backend
- [Scalar API](https://as-backend.duckdns.org/scalar/)
- [Swagger API](https://as-backend.duckdns.org/swagger/index.html)

### Informations
- Version du projet
```csproj
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>net9.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="DotNetEnv" Version="3.1.1" />
    <PackageReference Include="Microsoft.AspNetCore.Identity" Version="2.3.1" />
    <PackageReference Include="Microsoft.AspNetCore.Identity.EntityFrameworkCore" Version="9.0.8" />

    <!-- Entity Framework Core -->
    <PackageReference Include="Microsoft.EntityFrameworkCore" Version="9.0.8" />
    <PackageReference Include="Microsoft.EntityFrameworkCore.Design" Version="9.0.8" />
    <PackageReference Include="Microsoft.EntityFrameworkCore.Tools" Version="9.0.8" />
    <PackageReference Include="MySql.Data" Version="9.4.0" />

    <!-- MySQL -->
    <PackageReference Include="MySql.EntityFrameworkCore" Version="9.0.6" />

    <!-- Swagger / OpenAPI -->
    <PackageReference Include="Microsoft.AspNetCore.OpenApi" Version="9.0.8" />
    <PackageReference Include="Swashbuckle.AspNetCore" Version="9.0.1" />

    <!-- Scalar -->
    <PackageReference Include="Scalar.AspNetCore" Version="2.5.3" />
  </ItemGroup>

</Project>
```

## Frontend
### Done
- Ajout background pour la page
- Création de la souris (boutton)
- Composants:
  - App
  - ConnectionSuccess
  - Header
  - Login
  - Mail1
  - MailBox
  - MainPage
  - PcDesktop
  - Player
  - playerApi
  - Register
  - Screen

### Tests
- Creation d'un copte utilisateur OK
- Login un compte existant OK
- Créer  un personnage qui commence avec une progression de 0
- Deconnecter
- Lors de la connexion arriver sur le PC fictif au niveau du bureau
- Possibilité d'ouvrir la boite mail et le premier mail
- Possibilité d'ouvrir les informations et arriver sur un menu de choix des informations à visionner
- Lancement local via LiveServer