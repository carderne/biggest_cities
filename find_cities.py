import sys
import warnings

import geopandas as gpd
import pandas as pd
import rasterio as rio
from rasterio.features import shapes
from shapely.geometry import shape


def scale(c: int, res: int):
    return int(c) * int(res) ** 2 / 1e6


def main(infile: str, cuts: list, keep: int = 1, res: int = 1000):
    warnings.simplefilter("ignore")
    with rio.open(infile) as ds:
        a = ds.read(1)
        aff = ds.transform
        crs = ds.crs
    # arr[arr < 0] = 0

    return pd.concat(
        (
            (
                gpd.GeoDataFrame(
                    geometry=[shape(g[0]) for g in shapes(a, a > scale(c, res), 8, aff)]
                )
                .set_crs(crs)
                .dissolve()
                .explode(index_parts=True)
                .to_crs(epsg=6933)
                .assign(Area=lambda x: x.geometry.area // 1e6)
                .to_crs(epsg=4326)
                .sort_values(by="Area", ascending=False)
                .iloc[0 : int(keep)]
                .assign(Cut=c)
                .reset_index()
                .get(["Cut", "Area", "geometry"])
                .astype({"Cut": int})
            )
            for c in cuts
        )
    )


if __name__ == "__main__":
    infile = sys.argv[1]
    outfile = sys.argv[2]
    cuts = sys.argv[3].split(",")
    keep = sys.argv[4]
    res = sys.argv[5]
    gdf = main(infile, cuts, keep, res)
    gdf.to_file(outfile)
