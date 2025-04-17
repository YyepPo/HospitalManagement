using Database.Models;
using HospitalManagement.DTOs;

namespace HospitalManagement.Services
{
    public interface IRoleService
    {
        Task AddRole(RoleDTO roleDTO,CancellationToken cancellationToken);
        Roles UpdateRole(int id,RoleDTO roleDTO);
    }
}
