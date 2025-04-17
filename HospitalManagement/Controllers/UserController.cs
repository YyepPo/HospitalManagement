using Database.Repository;
using Microsoft.AspNetCore.Mvc;
using Database.Models;
using Org.BouncyCastle.Utilities;
using System.CodeDom;
using HospitalManagement.Services;
using HospitalManagement.DTOs;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Runtime.InteropServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Data.SqlClient;
using Database.Context;
using Microsoft.Identity.Client;
using Org.BouncyCastle.Bcpg.OpenPgp;
using System.Security.Cryptography;


namespace HospitalManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IRepository<Users> _repository;
        private readonly IUserService _userService;
        private readonly IConfiguration _configuration;
        public UserController(IRepository<Users> repository, IUserService userService, IConfiguration configuration)
        {
            _repository = repository;
            _userService = userService;
            _configuration = configuration;
        }

        [HttpGet]
        [Route("[action]/{id}")]
        public async Task<Users> GetUser(int id, CancellationToken cancellationToken)
        {
           return await _repository.Get(id, cancellationToken);
        }

        [HttpGet]
        [Route("[action]/{id}")]
        public async Task<IActionResult> GetUsersID(int id, CancellationToken cancellationToken)
        {
            var user = await _repository.Get(id, cancellationToken);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user.Id);
        }

        [HttpGet]
        [Route("[action]")]
        public IEnumerable<Users> GetAllUsers()
        {
            return _repository.GetAll();
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> Register(UserRegisterDTO userRegisterDTO, CancellationToken cancellationToken)
        {
            await _userService.RegisterUser(userRegisterDTO, cancellationToken);
            return Ok();
        }

        [HttpDelete("delete-user-by-id/{id}")]
        public void DeleteUser(int id,CancellationToken cancellationToken)
        {
            string connectionString = "Server=.;Database=HospitalManagement;Integrated Security=True;TrustServerCertificate=True";

            string query = "Delete FROM Users WHERE id = @id";

            using (SqlConnection sqlConnection = new SqlConnection(connectionString))
            {
                sqlConnection.Open();
                using (SqlCommand sqlCommand = new SqlCommand(query,sqlConnection))
                {
                    sqlCommand.Parameters.AddWithValue("@id", id);
                    int rowsAffected = sqlCommand.ExecuteNonQuery();
                }
            }
        }

        [HttpPut("update-user-by-id/{id}")]
        public IActionResult UpdateUser(int id,[FromBody]UserDTO userDTO, CancellationToken cancellationToken)
        {
            var book = _userService.UpdateUser(id, userDTO);
            return Ok(book);
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> LogIn(AuthRequestObject authRequest)
        {
            if (authRequest == null || string.IsNullOrEmpty(authRequest.email) || string.IsNullOrEmpty(authRequest.password))
            {
                return BadRequest("Email and password are required.");
            }

            string connectionString = _configuration.GetConnectionString("DefaultConnection");
            string query = "SELECT Id, Email,RoleId, Password FROM Users WHERE Email = @Email";

            using (SqlConnection connection = new SqlConnection(connectionString))
            using (SqlCommand command = new SqlCommand(query, connection))
            {
                command.Parameters.AddWithValue("@Email", authRequest.email);

                try
                {
                    await connection.OpenAsync();
                    using (SqlDataReader reader = await command.ExecuteReaderAsync())
                    {
                        if (await reader.ReadAsync())
                        {
                            int userId = reader.GetInt32(reader.GetOrdinal("Id"));
                            string retrievedEmail = reader.GetString(reader.GetOrdinal("Email"));
                            string storedPassword = reader.GetString(reader.GetOrdinal("Password"));
                            string roleId = reader.GetString(reader.GetOrdinal("RoleId"));

                            // Compare the plaintext passwords
                            if (authRequest.password != storedPassword)
                            {
                                return Unauthorized("Invalid email or password.");
                            }

                            // Generate JWT token
                            var token = GenerateJwtToken(userId, retrievedEmail);

                            // Return token and user ID
                            return Ok(new
                            {
                                Token = token,
                                UserId = userId,
                                Email = retrievedEmail,
                                RoleId = roleId
                            }) ;
                        }
                        else
                        {
                            return Unauthorized("Invalid email or password.");
                        }
                    }
                }
                catch (Exception ex)
                {
                    return StatusCode(500, $"An error occurred: {ex.Message}");
                }
            }
        }

        private string GenerateJwtToken(int userId, string email)
        {
            if (!int.TryParse(_configuration["Jwt:Expiration"], out int exp))
                exp = 20; // Default to 20 minutes

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            // Add user ID and email as claims
            var claims = new[]
            {
            new Claim(JwtRegisteredClaimNames.Sub, userId.ToString()), // Convert int to string for JWT claim
            new Claim(JwtRegisteredClaimNames.Email, email),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(exp),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        [HttpPost("{userId}/allergies")]
        public async Task<IActionResult> AddAllergies(int userId,List<int> allergyIds)
        {
            await _userService.AddAllergiesToUserAsync(userId, allergyIds);
            return Ok();
        }

        [HttpDelete("{userId}/allergies")]
        public async Task<IActionResult> RemoveAllergies(int userId, List<int> allergyIds)
        {
            await _userService.RemoveAllergiesFromUserAsync(userId, allergyIds);
            return Ok();
        }
    }
}
