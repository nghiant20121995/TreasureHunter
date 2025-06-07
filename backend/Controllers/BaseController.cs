using Microsoft.AspNetCore.Mvc;

namespace FlamboyantFnb.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BaseController : ControllerBase
    {
        protected readonly IConfiguration _configuration;

        public BaseController(IConfiguration configuration) : base()
        {
            _configuration = configuration;
        }
    }
}
