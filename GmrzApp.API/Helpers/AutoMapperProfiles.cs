using System.Linq;
using AutoMapper;
using GmrzApp.API.Dtos;
using GmrzApp.API.Models;

namespace GmrzApp.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForListDto>()
                .ForMember(dest => dest.PhotoUrl, opt => {
                    opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
                })
                .ForMember(dest => dest.Age, opt => {
                    opt.MapFrom(d => d.DateOfBirth.CalculateAge());
                });
            CreateMap<User, UserForDetailDto>()
            .ForMember(dest => dest.PhotoUrl, opt => {
                    opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
                })
                .ForMember(dest => dest.Age, opt => {
                    opt.MapFrom(d => d.DateOfBirth.CalculateAge());
                });
            CreateMap<Photo, PhotosForDetailDto>();

            CreateMap<UserForUpdatesDto,User>();

             CreateMap<Photo,PhotoForReturnDto>();

             CreateMap<PhotoForCreationDto,Photo>();

             CreateMap<UserForRegisterDto,User>();

            
        }
    }
}