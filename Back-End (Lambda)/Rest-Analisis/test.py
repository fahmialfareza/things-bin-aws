from datetime import datetime as dt
import datetime

timestamp_with_ms = 1566727894697

timestamp, ms = divmod(timestamp_with_ms, 1000)

dt = dt.fromtimestamp(timestamp) + datetime.timedelta(milliseconds=ms)


formatted_time = dt.strftime('%Y-%m-%d %H:%M:%S.%f')[:-3]

print(formatted_time)