using Database.Models;
using HospitalManagement.DTOs;

namespace HospitalManagement.Services
{
    public interface IUserService
    {
        Task RegisterUser(UserRegisterDTO userRegisterDTO,CancellationToken cancellationToken);
        Task LogIn(String email,CancellationToken cancellationToken);
        void Delete(int Id, CancellationToken cancellation);

        Users UpdateUser(int id,UserDTO userDTO);

        Task AddAllergiesToUserAsync(int userId, List<int> allergyIds);
        Task RemoveAllergiesFromUserAsync(int userId, List<int> allergyIds);
    
    }
}
