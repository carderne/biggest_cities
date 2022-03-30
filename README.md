# biggest cities
## How to run
### Download data
First download the [WorldPop Global 2020 population](https://www.worldpop.org/geodata/summary?id=24777).
It has a resolution of 1km x 1km, with each pixel value showing the number of people in that pixel, i.e. the population/km<sup>2</sup>.

You can also download [WorldPop data for an individual country](https://www.worldpop.org/project/categories?id=3), but take note what resolution you download, as you'll need it later.

### Clone the repo
```bash
git clone https://github.com/carderne/biggest_cities.git
cd biggest_cities
```

### Install requirements
```bash
pip install rasterio geopandas
```

### Run the script
```bash
python find_cities.py <infile> <outfile> <cutoffs> <cities_per_cutoff> <resolution>
```

The following example assumes you named your WorldPop download `pop.tif`, will keep only the largest city for each cutoff, and tells the script that the data resolution is 1000m.
```bash
python find_cities.py \
    pop.tif \
    cities.geojson \
    50000,20000 \
    1 \
    1000
```

You could also do it for just a single country, at a higher resolution, keeping more cities for each cutoff:
```bash
python find_cities.py \
    spain_100m.tif \
    spain_cities.geojson \
    10000,5000,1000 \
    5 \
    100
```

**NB**: Using 100m resolution for very large countries will result in a memory error unless you have an enormous amount of RAM available.
