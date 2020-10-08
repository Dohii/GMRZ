using System;
using System.Threading.Tasks;
using GmrzApp.API.Models;
using Microsoft.EntityFrameworkCore;

namespace GmrzApp.API.Data
{
    public class AuthRepository : IAuthRepository
    {
//Context konekcija
        private readonly DataContext _context;

        public AuthRepository(DataContext context)
        {
            _context = context;
        }
//Context konekcija

//Login metoda uzimamo string USR i PW trazimo u bazi usera i uporedjujemo passworde.
//Moramo potvrditi PW usera i hash u bazi tako da hasiramo opet sa keyom kojim imamo u bazi i koristimo for loop da uporedimo sve karaktere u hashu.
        public async Task<User> Login(string username, string password)
        {
            var user = await _context.Users.Include(p=>p.Photos).FirstOrDefaultAsync(x => x.Username == username);

            if(user == null)
                return null;
            
            if(!VerifyPasswordHash(password,user.PasswordHash, user.PasswordSalt))
                return null;
            
            return user;
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using(var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt)){

                
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));

                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != passwordHash[i]) return false;
                }

            }
            return true;
        }

//Registracija usera gdje uzimamo objekat usera i generisemo PW za njega i vracamo objekat usera sa zavrsenim PW.
//Sa string PW generisemo hash SHA512 i Salt da zabiberimo hash da bude relativno sigurno i komplikovano
        public async Task<User> Register(User user, string password)
        {
            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
            
            return user;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using(var hmac = new System.Security.Cryptography.HMACSHA512()){

                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        public async Task<bool> UserExists(string username)
        {
            if(await _context.Users.AnyAsync(x => x.Username == username)) 
                return true;
            
            return false;
        }
    }
}