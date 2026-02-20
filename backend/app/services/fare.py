def calculate_fare(pickup_lat, pickup_lng, drop_lat, drop_lng):
    base_fare = 50
    distance_fare = abs(pickup_lat - drop_lat + pickup_lng - drop_lng) * 100
    return round(base_fare + distance_fare, 2)
