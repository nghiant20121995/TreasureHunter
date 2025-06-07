namespace TreasureHunter.API.Entities
{
    public class Distance
    {
        public int FromPosition { get; set; }
        public int ToPosition { get; set; }
        public double ShortestDistance { get; set; }
        public int ToPositionX { get; set; }
        public int ToPositionY { get; set; }
    }
}
