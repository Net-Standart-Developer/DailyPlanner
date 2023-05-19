﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using DailyPlannerBack.Models;
using DailyPlannerBack.ViewModels;

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

        [HttpGet("[Action]")]
        public ActionResult<IEnumerable<Models.Task>> GetTasks(TaskFiltrationViewModel? filtration)
        {
            if(filtration == null)
            {
                return db.Tasks;
            }

            IEnumerable<Models.Task> tasks = db.Tasks.ToArray();
            if(filtration.Title != null)
            {
                tasks = tasks.Where(task => task.Title.ToLower() == filtration.Title.ToLower());
            }
            if(filtration.Start != null)
            {
                tasks = tasks.Where(task => task.Start >= filtration.Start);
            }
            if(filtration.End != null)
            {
                tasks = tasks.Where(task => task.End <= filtration.End);
            }

            return Ok(tasks);
        }

        [HttpPost("[Action]")]
        public ActionResult CreateTask(CreateTaskViewModel createVM)
        {
            Models.Task task = new Models.Task()
            {
                Title = createVM.Title,
                Message = createVM.Message,
                Start = createVM.Start,
                End = createVM.End,
                CreatedAt = DateTime.UtcNow
            };

            db.Tasks.Add(task);
            db.SaveChanges();

            return Ok(task);
        }
    }
}
