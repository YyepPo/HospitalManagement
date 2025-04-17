using Database.Models;
using HospitalManagement.DTOs;
using System.Reflection.Metadata.Ecma335;
using System.Security.Cryptography;
using System.Text;

namespace HospitalManagement.Mappings
{
    public static class RoleMapper
    {
        public static Roles RoleDTOToModel(RoleDTO roleDTO)
        {
            return new Roles
            {
                Name = roleDTO.Name,
                Status = roleDTO.Status
            };
        }
    }
}

