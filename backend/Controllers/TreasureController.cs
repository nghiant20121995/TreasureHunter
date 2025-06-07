using FlamboyantFnb.Controllers;
using Microsoft.AspNetCore.Mvc;
using TreasureHunter.API.Entities;
using TreasureHunter.API.RequestModel;

namespace WebApplication1.Controllers
{
    public class TreasureController : BaseController
    {
        private readonly ILogger<TreasureController> _logger;
        private readonly IConfiguration _configuration;

        public TreasureController(IConfiguration configuration, ILogger<TreasureController> logger) : base(configuration)
        {
            _logger = logger;
            _configuration = configuration;
        }

        [HttpPost]
        public CreateTreasureReponse Post(CreateTreasureReq req)
        {
            if (req.IsLands == null) throw new ArgumentNullException(nameof(req.IsLands));
            if (req.IsLands.Length == 0) throw new ArgumentException("IsLands cannot be empty", nameof(req.IsLands));
            if (req.TreasureNumber < 0) throw new ArgumentOutOfRangeException(nameof(req.TreasureNumber), "The location of the treasure must be non-negative");

            var dicChest = GetChests(req.IsLands, req.TreasureNumber);

            var isLandHasTreasure = FindTreasurePosition(req.TreasureNumber, dicChest);
            var distances = new Dictionary<int, Distance>();

            for (var i = 0; i < req.TreasureNumber; i++)
            {
                var nextChest = i + 1;
                if (!dicChest.ContainsKey(nextChest))
                {
                    throw new KeyNotFoundException($"Chest number {nextChest} not found in IsLands.");
                }

                var shorestEnergyConsumed = 0.0;
                var currentPositionX = 1;
                var currentPositionY = 1;
                if (distances.ContainsKey(i))
                {
                    shorestEnergyConsumed = distances[i].ShortestDistance;
                    currentPositionX = distances[i].ToPositionX;
                    currentPositionY = distances[i].ToPositionY;
                }

                var newDistance = new Distance
                {
                    FromPosition = 0,
                    ToPosition = nextChest,
                    ShortestDistance = 0
                };


                foreach (var island in dicChest[nextChest])
                {
                    var nextEnergyConsumed = shorestEnergyConsumed + CalculateEnergyConsumed(currentPositionX, currentPositionY, island.PositionX, island.PositionY);
                    if (newDistance.ShortestDistance < nextEnergyConsumed)
                    {
                        newDistance.ShortestDistance = nextEnergyConsumed;
                        newDistance.ToPositionX = island.PositionX;
                        newDistance.ToPositionY = island.PositionY;
                    }
                }
                distances.Add(nextChest, newDistance);
            }

            var result = new CreateTreasureReponse();


            return result;
        }


        private IsLand? FindTreasurePosition(int treasureNumber, Dictionary<int, List<IsLand>> dicChest)
        {
            if (!dicChest.ContainsKey(treasureNumber))
            {
                throw new KeyNotFoundException($"The location of the treasure [{treasureNumber}] is not found in IsLands.");
            }
            if (dicChest[treasureNumber].Count > 1)
            {
                throw new InvalidOperationException($"The location of the treasure [{treasureNumber}] is not unique in IsLands.");
            }
            var isLandHasTreasure = dicChest[treasureNumber].FirstOrDefault();
            return isLandHasTreasure;
        }

        private Dictionary<int, List<IsLand>> GetChests(int[][] matrix, int treasureNumber)
        {
            var dic = new Dictionary<int, List<IsLand>>();
            for (var i = 0; i < matrix.Length; i++)
            {
                if (matrix[i] == null && matrix[i].Length == 0) continue;
                for (int j = 0; j < matrix[i].Length; j++)
                {
                    if (matrix[i][j] < 0 || matrix[i][j] > treasureNumber) continue;
                    var newIsLand = new IsLand
                    {
                        PositionX = i,
                        PositionY = j,
                        ChestNumber = matrix[i][j]
                    };
                    if (dic.ContainsKey(matrix[i][j]))
                    {
                        dic[matrix[i][j]].Add(newIsLand);
                    }
                    else
                    {
                        dic.Add(matrix[i][j], new List<IsLand>() { newIsLand });
                    }
                }
            }
            return dic;
        }


        private double CalculateEnergyConsumed(int fromPositionX, int fromPositionY, int toPositionX, int toPositionY)
        {
            var deltaX = Math.Abs(fromPositionX - toPositionX);
            var deltaY = Math.Abs(fromPositionY - toPositionY);
            return Math.Sqrt(Math.Pow(deltaX, 2) + Math.Pow(deltaY, 2));
        }


        private void ValidateIsLands(int[][] isLands)
        {
            if (isLands == null) throw new ArgumentNullException(nameof(isLands));
        }
    }
}
