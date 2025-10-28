import pandas as pd
import numpy as np
import matplotlib.pyplot as plt


def load_dataframe(data):
    # if data.endswith(".csv"):
    # df = pd.read_csv(data)
    file = pd.ExcelFile(data)
    with file as xlxs:
        df = pd.read_excel(xlxs)

    # result = data_analysis(df)

    # print(result)
    head = df.head()
    desc = df.describe()
    info = df.sample()

    return df

def data_analysis(df):
    print("First 5 rows of the dataset:")
    print(df.head())
    print("\nDataset info:")
    print(df.info())
    print("\nMissing values in each column:")
    print(df.isnull().sum())
    print("\nStatistical summary of numerical features:")
    print(df.describe())

    return df.head()