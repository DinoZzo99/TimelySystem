using DomainModels.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TimelyWebAPI.Repositories;

namespace TimelyWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TimeLogController : ControllerBase
    {
        private readonly TimeLogRepository _timeLogRepository;
        public TimeLogController(TimeLogRepository timeLogRepository)
        {
            _timeLogRepository = timeLogRepository;
        }
        [HttpGet]
        public IActionResult GetTimeLogs()
        {
            try
            {
                var timeLogs = _timeLogRepository.GetTimeLogs();
                return Ok(timeLogs);
            }
            catch (System.Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpGet("{timeLogId:int}")]
        public IActionResult GetTimeLog(int timeLogId)
        {
            try
            {
                var timeLog = _timeLogRepository.GetTimeLog(timeLogId);
                return Ok(timeLog);
            }
            catch (System.Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPost]
        public IActionResult AddTimeLog([FromBody] TimeLog timeLog)
        {
            if (timeLog == null) return BadRequest();
            try
            {
                _timeLogRepository.InsertTimeLog(timeLog);
                return Ok();
            }
            catch (System.Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPut]
        public IActionResult UpdateTimeLog([FromBody] TimeLog timeLog)
        {
            if (timeLog == null) return BadRequest();
            try
            {
                _timeLogRepository.UpdateTimeLog(timeLog);
                return Ok();
            }
            catch (System.Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
        [HttpDelete("{timeLogId:int}")]
        public IActionResult DeleteTimeLog(int timeLogId)
        {
            try
            {
                _timeLogRepository.DeleteTimeLog(timeLogId);
                return Ok();
            }
            catch (System.Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
        [HttpDelete]
        public IActionResult DeleteAll()
        {
            try
            {
                _timeLogRepository.DeleteAll();
                return Ok();
            }
            catch (System.Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
        [HttpDelete("empty")]
        public IActionResult DeleteEmpty()
        {
            try
            {
                _timeLogRepository.DeleteEmpty();
                return Ok();
            }
            catch (System.Exception)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

    }
}
