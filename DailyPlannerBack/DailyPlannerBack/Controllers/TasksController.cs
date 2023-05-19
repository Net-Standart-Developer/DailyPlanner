using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DailyPlannerBack.Models;

namespace DailyPlannerBack.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly DB db;
        private readonly ILogger<TasksController> logger;

        public TasksController(DB db, ILogger<TasksController> logger)
        {
            this.db = db;
            this.logger = logger;
        }
    }
}
