using System.ComponentModel.DataAnnotations;

namespace GmrzApp.API.Dtos
{
    public class UserForRegisterDto
    {
        [Required]
        public string Username { get; set; }

        [Required]
        [StringLength(15, MinimumLength = 4, ErrorMessage = "Password must be at least 4 characters and not larger then 15.")]
        public string Password { get; set; }
    }
}