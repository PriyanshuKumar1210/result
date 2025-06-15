using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace checkExamResult.Server.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class OtpController : ControllerBase
	{
		[HttpGet("Hello")]
		public IActionResult Hello()
		{
			return Ok("hfjk");
		}
	}
}