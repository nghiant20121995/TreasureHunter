using FlamboyantFnb.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace WebApplication1.Controllers
{
    public class PingController : BaseController
    {
        public PingController(IConfiguration configuration) : base(configuration)
        {
        }

        [HttpGet]
        public string Get()
        {
            return "pong";
        }
    }
}
