using Database.Models;
using HospitalManagement.DTOs;
using System.Security.Cryptography;
using System.Text;

namespace HospitalManagement.Mappings
{
    public static class UserMapper
    {
        public static Users UserDTOToModel(UserDTO userDTO)
        {
            string password = userDTO.Password;

            byte[] salt = GenerateSalt();

            byte[] hashedPassword = HashPassword(password, salt);

            string hashedPasswordBase64 = Convert.ToBase64String(hashedPassword);

            return new Users
            {
                Name = userDTO.Name,
                Surname = userDTO.Surname,
                Email = userDTO.Email,
                Birthday = userDTO.Birthday,
                PhoneNumber = userDTO.PhoneNumber,
                Password = hashedPasswordBase64,
                BloodType = userDTO.BloodType,
                City = userDTO.City
            };
        }

        public static Users UserRegisterDTOToModel(UserRegisterDTO userDTO)
        {
            string password = userDTO.Password;

            byte[] salt = GenerateSalt();

            byte[] hashedPassword = HashPassword(password, salt);

            string hashedPasswordBase64 = Convert.ToBase64String(hashedPassword);

            return new Users
            {
                Name = userDTO.Name,
                Surname = userDTO.Surname,
                Email = userDTO.Email,
                Birthday = userDTO.Birthday,
                PhoneNumber = userDTO.PhoneNumber,
                Password = hashedPasswordBase64,
                BloodType = userDTO.BloodType,
                City = userDTO.City
            };
        }

        private static byte[] GenerateSalt()
        {
            byte[] salt = new byte[32];
            using (var rng = new RNGCryptoServiceProvider())
            {
                rng.GetBytes(salt);
            }
            return salt;
        }
        private static byte[] HashPassword(string password, byte[] salt)
        {
            using (var sha256 = new SHA256Managed())
            {
                byte[] passwordBytes = Encoding.UTF8.GetBytes(password);
                byte[] saltedPassword = new byte[passwordBytes.Length + salt.Length];
                Buffer.BlockCopy(passwordBytes, 0, saltedPassword, 0, passwordBytes.Length);
                Buffer.BlockCopy(salt, 0, saltedPassword, passwordBytes.Length, salt.Length);

                return sha256.ComputeHash(saltedPassword);
            }
        }
    }
}

