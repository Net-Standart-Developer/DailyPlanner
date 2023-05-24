namespace DailyPlannerBack.ViewModels
{
    public class EditTaskViewModel
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Message { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
    }
}
