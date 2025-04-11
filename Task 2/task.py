import requests
import pandas as pd
import time
import random
from tqdm import tqdm
import json

# Define your input data directly in the script
def create_input_dataframes():
    # Location data
    locations_data = {
        "latitude": [
            28.678051, 28.5045, 22.59643333, 23.1090018, 18.95833333,
            28.7045, 12.88326667, 28.7295, 28.67571622, 28.3501,
            28.59086667, 28.49553604, 28.44176667, 28.48783333, 12.93326667,
            13.00826667, 28.4751, 26.85653333, 26.8982, 18.54316667
        ],
        "longitude": [
            77.314262, 77.012, 88.39996667, 72.57299832, 72.83333333,
            77.15366667, 77.5594, 77.12866667, 77.36149677, 77.31673333,
            77.3054, 77.51297417, 77.3084, 77.09533333, 77.61773333,
            77.64273333, 77.4334, 75.71283333, 75.8295, 73.914
        ]
    }
    
    # Category data
    categories_data = {
        "l1_category": [
            "Munchies", "Munchies", "Munchies", "Munchies", "Munchies", "Sweet Tooth"
        ],
        "l1_category_id": [
            1237, 1237, 1237, 1237, 1237, 9
        ],
        "l2_category": [
            "Bhujia & Mixtures", "Munchies Gift Packs", "Namkeen Snacks", 
            "Papad & Fryums", "Chips & Crisps", "Indian Sweets"
        ],
        "l2_category_id": [
            1178, 1694, 29, 80, 940, 943
        ],
        # Adding tag names for each category
        "tag_name": [
            "bhujia", "gift-packs", "namkeen", "papad", "chips", "sweets"
        ]
    }
    
    locations_df = pd.DataFrame(locations_data)
    categories_df = pd.DataFrame(categories_data)
    
    return locations_df, categories_df

# Function to make API request with retries
def make_api_request(latitude, longitude, category_id, subcategory_id, tag_name, max_retries=3):
    # Use the product/tag endpoint
    base_url = "https://blinkit.com"
    api_endpoint = f"{base_url}/product/tag/{tag_name}"
    
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        "Accept": "application/json, text/plain, */*",
        "Accept-Language": "en-US,en;q=0.9",
        "Referer": f"{base_url}/cn/{category_id}/{subcategory_id}",
        "Origin": base_url,
        "Connection": "keep-alive",
        "sec-ch-ua": '"Not_A Brand";v="8", "Chromium";v="120"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"Windows"',
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin"
    }
    
    params = {
        "lat": latitude,
        "lng": longitude,
        "page": 1,
        "size": 50,
        "categoryId": category_id,
        "subcategoryId": subcategory_id
    }
    
    for attempt in range(max_retries):
        try:
            print(f"Trying endpoint: {api_endpoint}")
            response = requests.get(api_endpoint, params=params, headers=headers)
            print(f"Status code: {response.status_code}")
            
            if response.status_code == 200:
                try:
                    return response.json()
                except json.JSONDecodeError:
                    print("Error decoding JSON response")
                    continue
            elif response.status_code == 429:  # Too Many Requests
                wait_time = random.uniform(2, 5) * (attempt + 1)
                print(f"Rate limited. Waiting for {wait_time:.2f} seconds...")
                time.sleep(wait_time)
            elif response.status_code == 403:  # Forbidden
                print("Received 403 Forbidden. Trying different approach...")
                # Try with different headers or wait longer
                time.sleep(random.uniform(5, 10))
                # Add more randomization to headers
                headers["User-Agent"] = random.choice([
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Safari/605.1.15",
                    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
                    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/119.0"
                ])
            else:
                print(f"Error: Status code {response.status_code}")
                if attempt == max_retries - 1:
                    # Try the alternative endpoint on last attempt
                    alt_endpoint = f"{base_url}/v1/product/category/{subcategory_id}"
                    print(f"Trying alternative endpoint: {alt_endpoint}")
                    alt_response = requests.get(alt_endpoint, params=params, headers=headers)
                    if alt_response.status_code == 200:
                        try:
                            return alt_response.json()
                        except json.JSONDecodeError:
                            print("Error decoding JSON from alternative endpoint")
                break
        except Exception as e:
            print(f"Request failed: {e}")
            time.sleep(random.uniform(1, 3))
    
    return None

# Function to extract required data points from API response
def extract_data_points(response, latitude, longitude, l1_category, l1_category_id, l2_category, l2_category_id):
    if not response:
        return None
    
    # Try different response structures
    products = []
    
    # Structure 1: Direct products array
    if "products" in response:
        products = response.get("products", [])
    # Structure 2: Nested in data
    elif "data" in response and "products" in response["data"]:
        products = response["data"].get("products", [])
    # Structure 3: Nested in results
    elif "results" in response:
        products = response.get("results", [])
    # Structure 4: Nested in items
    elif "items" in response:
        products = response.get("items", [])
    
    if not products and isinstance(response, list):
        # Structure 5: Response is directly an array of products
        products = response
    
    results = []
    
    for product in products:
        # Handle different product structures
        product_id = product.get("id", product.get("productId", ""))
        price = product.get("price", product.get("mrp", 0))
        mrp = product.get("mrp", product.get("price", 0))
        
        # Some APIs use different field names
        brand = product.get("brand_name", product.get("brand", product.get("brandName", "")))
        availability = product.get("available", product.get("availability", product.get("inStock", "")))
        
        product_data = {
            "latitude": latitude,
            "longitude": longitude,
            "l1_category": l1_category,
            "l1_category_id": l1_category_id,
            "l2_category": l2_category,
            "l2_category_id": l2_category_id,
            "product_id": product_id,
            "product_name": product.get("name", product.get("productName", "")),
            "price": price,
            "mrp": mrp,
            "discount": product.get("discount", ""),
            "rating": product.get("rating", ""),
            "description": product.get("description", ""),
            "image_url": product.get("image_url", product.get("imageUrl", product.get("image", ""))),
            "availability": availability,
            "brand": brand,
            "weight": product.get("weight", product.get("packageSize", "")),
            "timestamp": pd.Timestamp.now().strftime("%Y-%m-%d %H:%M:%S")
        }
        results.append(product_data)
    
    return results

# Main scraping function
def scrape_blinkit_data(locations, categories, output_file="blinkit_data.csv"):
    all_results = []
    
    # Create combinations of locations and categories
    total_combinations = len(locations) * len(categories)
    
    with tqdm(total=total_combinations, desc="Scraping Progress") as pbar:
        for _, location in locations.iterrows():
            for _, category in categories.iterrows():
                latitude = location["latitude"]
                longitude = location["longitude"]
                l1_category = category["l1_category"]
                l1_category_id = category["l1_category_id"]
                l2_category = category["l2_category"]
                l2_category_id = category["l2_category_id"]
                tag_name = category["tag_name"]
                
                # Add random delay to avoid rate limiting
                delay = random.uniform(3, 7)
                print(f"Waiting {delay:.2f} seconds before next request...")
                time.sleep(delay)
                
                # Make API request
                response = make_api_request(latitude, longitude, l1_category_id, l2_category_id, tag_name)
                
                # Extract data points
                results = extract_data_points(
                    response, latitude, longitude, 
                    l1_category, l1_category_id, 
                    l2_category, l2_category_id
                )
                
                if results:
                    all_results.extend(results)
                    print(f"Scraped {len(results)} products for {l2_category} at {latitude}, {longitude}")
                else:
                    print(f"No data found for {l2_category} at {latitude}, {longitude}")
                
                # Save intermediate results to avoid losing data if script crashes
                if len(all_results) > 0 and len(all_results) % 100 == 0:
                    temp_df = pd.DataFrame(all_results)
                    temp_df.to_csv(f"blinkit_data_temp_{len(all_results)}.csv", index=False)
                    print(f"Saved intermediate results ({len(all_results)} products)")
                
                pbar.update(1)
    
    # Convert results to DataFrame and save to CSV
    if all_results:
        df = pd.DataFrame(all_results)
        df.to_csv(output_file, index=False)
        print(f"Data successfully saved to {output_file}")
        return df
    else:
        print("No data was collected.")
        return None

# Main execution
if __name__ == "__main__":
    # Install required packages if not already installed
    import subprocess
    import sys
    
    required_packages = ["requests", "pandas", "tqdm"]
    for package in required_packages:
        try:
            __import__(package)
        except ImportError:
            print(f"Installing {package}...")
            subprocess.check_call([sys.executable, "-m", "pip", "install", package])
    
    # Create input dataframes
    locations_df, categories_df = create_input_dataframes()
    
    print(f"Loaded {len(locations_df)} locations and {len(categories_df)} categories")
    
    # Run the scraping process
    results_df = scrape_blinkit_data(locations_df, categories_df, "blinkit_scraped_data.csv")
