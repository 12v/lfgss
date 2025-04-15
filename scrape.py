import requests
import csv
import os

# Path to the CSV file
csv_file_path = "data.csv"

# Read existing IDs from the CSV file
existing_ids = set()
if os.path.exists(csv_file_path):
    with open(csv_file_path, mode="r", newline="", encoding="utf-8") as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            existing_ids.add(row["ID"])

# Prepare new data to append
new_data = []

urls = [
    "https://lfgss-1.12v.workers.dev/",
    "https://lfgss-2.12v.workers.dev/",
]

for url in urls:
    try:
        response = requests.get(url)

        print(f"Status Code: {response.status_code}")
        print(f"Response Headers: {response.headers}")
        print(f"Response Body: {response.text}")
        response.raise_for_status()
    except requests.exceptions.HTTPError as e:
        print(f"HTTPError: {e}")
        raise

    json = response.json()
    json_data = json.get("data", {})
    json_items = json_data.get("items", [])
    json_items_items = json_items.get("items", [])

    for item in json_items_items:
        item = item.get("item", {})
        item_id = item.get("id", "")
        item_title = item.get("title", "")

        if item_id not in existing_ids:
            new_data.append({"ID": item_id, "Title": item_title})

# Write new data to the CSV file
with open(csv_file_path, mode="a", newline="", encoding="utf-8") as csvfile:
    fieldnames = ["ID", "Title"]
    writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

    # Write header if the file is empty
    if os.stat(csv_file_path).st_size == 0:
        writer.writeheader()

    writer.writerows(new_data)
