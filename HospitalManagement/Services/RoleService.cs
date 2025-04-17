using Database.Context;
using Database.Models;
using Database.Repository;
using Microsoft.EntityFrameworkCore;
using HospitalManagement.DTOs;
using HospitalManagement.Mappings;

namespace HospitalManagement.Services
{
    public class RoleService : IRoleService
    {
        private readonly IRepository<Roles> _repository;
        private readonly ILogger<RoleDTO> _logger;
        private readonly ApplicationDbContext _context;

        public RoleService(IRepository<Roles> repository, ILogger<RoleDTO> logger,ApplicationDbContext context)
        {
            _repository = repository;
            _logger = logger;
            _context = context;
        }

        public async Task AddRole(RoleDTO roleDTO, CancellationToken cancellationToken)
        {
            roleDTO.Status = "active";
            Roles role = RoleMapper.RoleDTOToModel(roleDTO);
            _repository.Add(role);
            await _repository.SaveAsync(cancellationToken);
        }

        public Roles UpdateRole(int id, RoleDTO roleDTO)
        {
            var role = _context.Set<Roles>().FirstOrDefault(n => n.Id == id);
            if(role != null)
            {
                role.Name = roleDTO.Name;
                role.Status = roleDTO.Status;
            }

            return role;
        }
    }
}
