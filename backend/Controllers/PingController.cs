using FlamboyantFnb.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace WebApplication1.Controllers
{
    public class PingController : BaseController
    {
        private readonly ILogger<PingController> _logger;
        private readonly IConfiguration configuration;

        public PingController(IConfiguration configuration, ILogger<PingController> logger) : base(configuration)
        {
            _logger = logger;
        }

        [HttpGet]
        public string Get()
        {
            return "pong";
        }
    }
}
