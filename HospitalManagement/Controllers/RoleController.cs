using Database.Models;
using Database.Repository;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using HospitalManagement.DTOs;
using HospitalManagement.Services;

namespace HospitalManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly IRepository<Roles> _repository;
        private readonly IRoleService _roleService;

        public RoleController(IRepository<Roles> repository, IRoleService roleService)
        {
            _repository = repository;
            _roleService = roleService;
        }

        [HttpGet]
        [Route("[action]/{id}")]
        public async Task<Roles> GetRoleById(int id, CancellationToken token)
        {
            return await _repository.Get(id, token);
        }

        [HttpGet]
        [Route("[action]")]
        public IEnumerable<Roles> GetAllRoles()
        {
            return _repository.GetAll();
        }

        [HttpPost]
        [Route("[action]")]
        public async Task<IActionResult> AddRole(RoleDTO roleDTO, CancellationToken cancellationToken)
        {
            await _roleService.AddRole(roleDTO, cancellationToken);
            return Ok();
        }

        [HttpDelete("delete-role-by-id/{id}")]
        public void DeleteTable(int id)
        {
            string connectionString = "Server=.;Database=restaurant;Integrated Security=True;TrustServerCertificate=True";

            string query = "Delete FROM Roles WHERE Id = @id";

            using (SqlConnection sqlConnection = new SqlConnection(connectionString))
            {
                sqlConnection.Open();
                using (SqlCommand sqlCommand = new SqlCommand(query, sqlConnection))
                {
                    sqlCommand.Parameters.AddWithValue("@id", id);
                    int rowsAffected = sqlCommand.ExecuteNonQuery();
                    sqlConnection.Close();
                }
            }
        }

        [HttpPut("update-role-by-id/{id}")]
        public IActionResult UpdateRoleById(int id, [FromBody] RoleDTO roleDTO)
        {
            var role = _roleService.UpdateRole(id, roleDTO);
            return Ok(role);
        }
    }
}
