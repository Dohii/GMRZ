using System.Collections.Generic;
using System.Threading.Tasks;
using GmrzApp.API.Helpers;
using GmrzApp.API.Models;

namespace GmrzApp.API.Data
{
    public interface IGamersRepository
    {
         void Add<T>(T entity) where T: class;
         void Delete<T>(T entity) where T: class;
         Task<bool> SaveAll();
         Task<PagedList<User>> GetUsers(UserParams userParams);
         Task<User> GetUser(int id);

         Task<Photo> GetPhoto(int id);

         Task<Photo> GetMainPhotoForUser(int id);
    }
}