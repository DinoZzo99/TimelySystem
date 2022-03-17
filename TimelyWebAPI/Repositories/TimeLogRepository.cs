using DomainModels.Models;
using System.Collections.Generic;
using System.Linq;
using TimelyWebAPI.DatabaseContext;

namespace TimelyWebAPI.Repositories
{
    public class TimeLogRepository
    {
        private readonly TimelyDatabaseContext _timelyDatabaseContext;
        public TimeLogRepository(TimelyDatabaseContext timelyDatabaseContext)
        {
            _timelyDatabaseContext = timelyDatabaseContext;
        }

        public List<TimeLog> GetTimeLogs()
        {
            return _timelyDatabaseContext.TimeLogs.ToList();
        }
        public TimeLog GetTimeLog(int timeLogId)
        {
            return _timelyDatabaseContext.TimeLogs.FirstOrDefault(timeLog => timeLog.Id == timeLogId);
        }
        public void InsertTimeLog(TimeLog timeLog)
        {
            _timelyDatabaseContext.TimeLogs.Add(timeLog);
            _timelyDatabaseContext.SaveChanges();
        }
        public void UpdateTimeLog(TimeLog timeLog)
        {
            var timeLogForUpdate = GetTimeLog(timeLog.Id);
            if (timeLogForUpdate != null)
            {
                timeLogForUpdate.ProjectName = timeLog.ProjectName;
                timeLogForUpdate.StartDate = timeLog.StartDate;
                timeLogForUpdate.EndDate = timeLog.EndDate;
                timeLogForUpdate.Duration = timeLog.Duration;

                _timelyDatabaseContext.SaveChanges();
            }
        }
        public void DeleteTimeLog(int timeLogId)
        {
            var timeLogForDelete = GetTimeLog(timeLogId);
            if (timeLogForDelete != null)
            {
                _timelyDatabaseContext.TimeLogs.Remove(timeLogForDelete);
                _timelyDatabaseContext.SaveChanges();
            }
        }
        public void DeleteAll()
        {
            foreach(var timeLog in _timelyDatabaseContext.TimeLogs)
            {
                _timelyDatabaseContext.TimeLogs.Remove(timeLog);
            }
            _timelyDatabaseContext.SaveChanges();
        }

        public void DeleteEmpty()
        {
            var newLogs = _timelyDatabaseContext.TimeLogs.Where(timeLog => timeLog.Duration == null).ToList();
            foreach (var newLog in newLogs)
            {
                _timelyDatabaseContext.TimeLogs.Remove(newLog);
            }
            _timelyDatabaseContext.SaveChanges();
        }
    }
}
