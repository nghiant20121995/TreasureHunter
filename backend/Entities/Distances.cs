namespace TreasureHunter.API.Entities
{
    public class Distance
    {
        public int FromPosition { get; set; }
        public int ToPosition { get; set; }
        public double D { get; set; }
        public int FromX { get; set; }
        public int FromY { get; set; }
        public int ToX { get; set; }
        public int ToY { get; set; }
        public double TotalDistance { get; set; }
        public string Instruction { get; set; }
    }
}
