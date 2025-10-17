import os, json

# load json file
def read_json(file_path):
     with open(file_path, "r", encoding="utf-8") as f:
          data = json.load(f)
          title = data[1].get("title", "No Title")
        #   print(f"Title: {title}")
          return data

def search_json(data, query):
    data = read_json("SRI_Dataset_2.jsonl")
    results = []
    # iterate through json and search for query in title or author
    for record in data:
        # search in title
        if query.lower() in record.get('title', '').lower() or query.lower() in record.get('author', '').lower():
            print(f"Found match: {record.get('title', 'No Title')} by {record.get('author', 'Unknown')}")
            results.append(record)
        # seaerch in body text
        # elif query.lower() in record.get('text', '').lower():
        #     print(f"Found match in text: {record.get('title', 'No Title')} by {record.get('author', 'Unknown')}")
        #     results.append(record)
    return results