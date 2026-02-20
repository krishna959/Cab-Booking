def calculate_price(pickup_lat, pickup_lng, drop_lat, drop_lng):
    base_fare = 50
    distance_factor = abs(pickup_lat - drop_lat) + abs(pickup_lng - drop_lng)
    return round(base_fare + distance_factor * 100, 2)
