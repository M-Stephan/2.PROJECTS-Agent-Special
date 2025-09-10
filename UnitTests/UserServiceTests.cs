using Backend.Data;
using Backend.DTOs;
using Backend.Models;
using Backend.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Moq;
using Microsoft.Extensions.Options;
using System.Threading.Tasks;
using System.Xml.Linq;
using Xunit;

namespace UnitTests
{
    public class UserServiceTests
    {
        [Fact]
        public async Task GetUserByIdAsync_UserExists_ReturnsUserDTO()
        {
            // Moq
            var mockUserStore = Mock.Of<IUserStore<ApplicationUser>>();
            var mockUserManager = new Mock<UserManager<ApplicationUser>>(
                mockUserStore,
                Options.Create(new IdentityOptions()),
                Mock.Of<IPasswordHasher<ApplicationUser>>(),
                new IUserValidator<ApplicationUser>[0],
                new IPasswordValidator<ApplicationUser>[0],
                Mock.Of<ILookupNormalizer>(),
                Mock.Of<IdentityErrorDescriber>(),
                Mock.Of<IServiceProvider>(),
                Mock.Of<Microsoft.Extensions.Logging.ILogger<UserManager<ApplicationUser>>>()
            );

            var mockSignInManager = new Mock<SignInManager<ApplicationUser>>(
                mockUserManager.Object,
                Mock.Of<Microsoft.AspNetCore.Http.IHttpContextAccessor>(),
                Mock.Of<IUserClaimsPrincipalFactory<ApplicationUser>>(),
                Options.Create(new IdentityOptions()),
                Mock.Of<Microsoft.Extensions.Logging.ILogger<SignInManager<ApplicationUser>>>(),
                Mock.Of<Microsoft.AspNetCore.Authentication.IAuthenticationSchemeProvider>(),
                Mock.Of<IUserConfirmation<ApplicationUser>>()
            );


            // Arrange
            var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            await using var context = new ApplicationDbContext(options);

            context.Users.Add(new ApplicationUser
            {
                Id = "testid",
                FirstName = "Stephan",
                LastName = "Martin",
                Email = "ndc.dev.code@gmail.com",
                DateOfBirth = new DateTime(1992, 1, 7)
            });

            await context.SaveChangesAsync();

            var service = new UserService(context, mockUserManager.Object, mockSignInManager.Object);

            // Act
            var result = await service.GetUserByIdAsync("testid");

            // Assert
            Assert.NotNull(result);
            Assert.Equal("Stephan", result.FirstName);
            Assert.Equal("Martin", result.LastName);
            Assert.Equal("ndc.dev.code@gmail.com", result.Email);

        }
    }
}


