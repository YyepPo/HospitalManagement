using Database.Models;
using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;


namespace Database.Repository
{
    public interface IRepository<T> where T : BaseModel
    {
        Task<T?> Get(int id, CancellationToken token);
        IQueryable<T> GetAll();
        IQueryable<T> GetQuery();

        void Add(T entity);
        void Update(T entity);
        void Delete(int id,CancellationToken cancellation);
        Task SaveAsync(CancellationToken token);
        void Save();


        Task AddAllergiesToUserAsync(int userId, List<int> allergyIds);
        Task RemoveAllergiesFromUserAsync(int userId, List<int> allergyIds);
    }
}
