using Database.Context;
using Database.Models;
using Database.Repository;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Database.Repository
{
    public class Repository<T> : IRepository<T> where T : BaseModel
    {
        private readonly ApplicationDbContext _context;

        public Repository(ApplicationDbContext context)
        {
            _context = context;
        }

        public void Add(T entity)
        {
            _context.Add(entity);
        }
        public IQueryable<T> GetQuery()
        {
            return _context.Set<T>();
        }

        public void Delete(int id, CancellationToken token)
        {
            var enetity = _context.Set<T>().FirstOrDefault(f => f.Id == id);
            _context.Remove(enetity);
        }

        public async Task<T?> Get(int id, CancellationToken token)
        {
            return await _context.Set<T>().FirstOrDefaultAsync(f => f.Id == id, token);
        }

        public IQueryable<T> GetAll()
        {
            return _context.Set<T>().AsQueryable();
        }

        public async Task SaveAsync(CancellationToken token)
        {
            await _context.SaveChangesAsync(token);
        }

        public void Update(T entity)
        {
            _context.Set<T>().Update(entity);
        }

        public void Save()
        {
            _context.SaveChanges();
        }

        public async Task AddAllergiesToUserAsync(int userId, List<int> allergyIds)
        {
            var userAllergies = allergyIds.Select(allergyId => new UserAllergy
            {
                UserId = userId,
                AllergyId = allergyId
            }).ToList();

            await _context.UserAllergies.AddRangeAsync(userAllergies);
            await _context.SaveChangesAsync();
        }

        public async Task RemoveAllergiesFromUserAsync(int userId, List<int> allergyIds)
        {
            var userAllergies = await _context.UserAllergies
                .Where(ua => ua.UserId == userId && allergyIds.Contains(ua.AllergyId))
                .ToListAsync();

            _context.UserAllergies.RemoveRange(userAllergies);
            await _context.SaveChangesAsync();
        }
    }
}
