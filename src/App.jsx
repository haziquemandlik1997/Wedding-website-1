import React, { useState, useEffect, useRef } from 'react';

// --- Configuration ---
const API_BASE_URL = '/api';

// --- Unique Codes ---
const ADMIN_CODE = 'ADMIN123';
const JIC_CODES = ['NUX5T', 'QZA8X', 'TDE1B', 'WGH4F', 'ZJK7J', 'CNP0N', 'FRS3R', 'IVW6W', 'LYB9B', 'OFE2F', 'RIK5I', 'ULO8L', 'XPR1P', 'AVX4U', 'DZA7Z', 'GDE0D', 'JGH3G', 'MKJ6K', 'PNM9N', 'SQP2Q', 'VTR5T', 'YWU8W', 'BZX1B', 'ECY4E', 'HFZ7H', 'KGA0K', 'NHC3N', 'QJF6Q', 'TMI9T', 'WPL2W', 'ZSO5Z', 'CTU8C', 'FWX1F', 'IZA4I', 'LCB7L', 'OFE0O', 'RIK3R', 'ULO6U', 'XPR9X', 'AVW2A', 'DZY5D', 'GBC8G', 'JEF1J', 'MHI4M', 'PKL7P', 'SNO0S', 'VQR3V', 'YTU6Y', 'BWW9B', 'EXZ2E', 'F1A5H', 'I4D8K', 'L7G1N', 'O0J4Q', 'R3M7T', 'U6P0W', 'X9S3Z', 'AC6B5', 'DF9E8', 'GI2H1', 'JL5K4', 'MO8N7', 'PR1Q0', 'SU4T3', 'WX7W6', 'ZA0Z9', 'CD3C2', 'FG6F5', 'IJ9I8', 'LM2L1', 'OP5O4', 'RS8R7', 'UV1U0', 'XY4X3', 'AB7A6', 'DE0D9', 'GH3G2', 'JK6J5', 'MN9M8', 'PQ2P1', 'ST5S4', 'WX8W7', 'ZA1Z0', 'CD4C3', 'FG7F6', 'IJ0I9', 'LM3L2', 'OP6O5', 'RS9R8', 'UV2U1', 'XY5X4', 'AB8A7', 'DE1D0', 'GH4G3', 'JK7J6', 'MN0M9', 'PQ3P2', 'ST6S5', 'WX9W8', 'ZA2Z1', 'CD5C4', 'FG8F7', 'IJ1I0', 'LM4L3', 'OP7O6', 'RS0R9', 'UV3U2', 'XY6X5', 'AB9A8', 'DE2D1', 'GH5G4', 'JK8J7', 'MN1M0', 'PQ4P3', 'ST7S6', 'WX0W9', 'ZA3Z2', 'CD6C5', 'FG9F8', 'IJ2I1', 'LM5L4', 'OP8O7', 'RS1R0', 'UV4U3', 'XY7X6', 'ABAA9', 'DED2D', 'GHG5G', 'JKJ8J', 'MNM1M', 'PQP4P', 'STS7S', 'WXW0W', 'ZAZ3Z', 'CDC6C', 'FGF9F', 'IJI2I', 'LML5L', 'OPO8O', 'RSR1R', 'UVU4U', 'XYX7X', '9Z8A1', '2C1B4', '5F4E7', '8I7H0', '1L0K3', '4O3N6', '7R6Q9', '0U9T2', '3X2W5', '6A5Z8', '9D8C1', '2G1F4', '5J4I7', '8M7L0', '1P0O3', '4S3R6', '7V6U9', '0Y9X2', '3B2A5', '6E5D8', '9H8G1', '2K1J4', '5N4M7', '8Q7P0', '1T0S3', '4W3V6', '7Z6Y9', '0C9B2', '3F2E5', '6I5H8', '9L8K1', '2O1N4', '5R4Q7', '8U7T0', '1X0W3', '4A9Z6', '7D2C9', '0G5F8', '3J8I1', '6M1L4', '9P4O7', '2S7R0', '5V0U3', '8Y3X6', '1B6A9', '4E9D2', '7H2G5', '0K5J8', '3N8M1', '6Q1P4', '9T4S7', '2W7V0', '5Z0Y3', '8C3B6', '1F6E9', '4I9H2', '7L2K5', '0O5N8', '3R8Q1', '6U1T4', '9X4W7', '2A7Z0', '5D0C3', '8G3F6', '1J6I9', '4M9L2', '7P2O5', '0S5R8', '3V8U1', '6Y1X4', '9B4A7', '2E7D0', '5H0G3', '8K3J6', '1N6M9', '4Q9P2', '7T2S5', '0W5V8', '3Z8Y1', '6C1B4', '9F4E7', '2I7H0', '5L0K3', '8O3N6', '1R6Q9', '4U9T2', '7X2W5', '0A5Z8', '3D8C1', '6G1F4', '9J4I7', '2M7L0', '5P0O3', '8S3R6', '1V6U9', '4Y9X2', '7B2A5', '0E5D8', '3H8G1', '6K1J4', '9N4M7', '2Q7P0', '5T0S3', '8W3V6', '1Z6Y9', '4C9B2', '7F2E5', '0I5H8', '3L8K1', '6O1N4', '9R4Q7', '2U7T0', '5X0W3', '8A9Z6', '1D2C9', '4G5F8', '7J8I1', '0M1L4', '3P4O7', '6S7R0', '9V0U3', '2Y3X6', '5B6A9', '8E9D2', '1H2G5', '4K5J8', '7N8M1', '0Q1P4', '3T4S7', '6W7V0', '9Z0Y3', '2C3B6', '5F6E9', '8I9H2', '1L2K5', '4O5N8', '7R8Q1', '0U1T4', '3X4W7', '6A7Z0', '9D0C3', '2G3F6', '5J6I9', '8M9L2', '1P2O5', '4S5R8', '7V8U1', '0Y1X4', '3B4A7', '6E7D0', '9H0G3', '2K3J6', '5N6M9', '8Q9P2', '1T2S5', '4W5V8', '7Z8Y1', '0C1B4', '3F4E7', '6I7H0', '9L0K3', '2O3N6', '5R6Q9', '8U9T2', '1X2W5', '4A5Z8', '7D8C1', '0G1F4', '3J4I7', '6M7L0', '9P0O3', '2S3R6', '5V6U9', '8Y9X2', '1B2A5', '4E5D8', '7H8G1', '0K1J4', '3N4M7', '6Q7P0', '9T0S3', '2W3V6', '5Z6Y9', '8C9B2', '1F2E5', '4I5H8', '7L8K1', '0O1N4', '3R4Q7', '6U7T0', '9X0W3', '2A9Z6', '5D2C9', '8G5F8', '1J8I1', '4M1L4', '7P4O7', '0S7R0', '3V0U3', '6Y3X6', '9B6A9', '2E9D2', '5H2G5', '8K5J8', '1N8M1', '4Q1P4', '7T4S7', '0W7V0', '3Z0Y3', '6C3B6', '9F6E9', '2I9H2', '5L2K5', '8O5N8', '1R8Q1', '4U1T4', '7X4W7', '0A7Z0', '3D0C3', '6G3F6', '9J6I9', '2M9L2', '5P2O5', '8S5R8', '1V8U1', '4Y1X4', '7B4A7', '0E7D0', '3H0G3', '6K3J6', '9N6M9', '2Q9P2', '5T2S5', '8W5V8', '1Z8Y1', 'K8P3M']; 
const JOC_CODES = ['7K4N2', '8L5P3', '9M6Q4', '0N7R5', '1O8S6', '2P9T7', '3Q0U8', '4R1V9', '5S2W0', '6T3X1', 'A7Y4B', 'B8Z5C', 'C9A6D', 'D0B7E', 'E1C8F', 'F2D9G', 'G3E0H', 'H4F1I', 'I5G2J', 'J6H3K', 'K7I4L', 'L8J5M', 'M9K6N', 'N0L7O', 'O1M8P', 'P2N9Q', 'Q3O0R', 'R4P1S', 'S5Q2T', 'T6R3U', 'U7S4V', 'V8T5W', 'W9U6X', 'X0V7Y', 'Y1W8Z', 'Z2X9A', '3Y0B1', '4Z1C2', '5A2D3', '6B3E4', '7C4F5', '8D5G6', '9E6H7', '0F7I8', '1G8J9', '2H9K0', '3I0L1', '4J1M2', '5K2N3', '6L3O4', '7M4P5', '8N5Q6', '9O6R7', '0P7S8', '1Q8T9', '2R9U0', '3S0V1', '4T1W2', '5U2X3', '6V3Y4', '7W4Z5', '8X5A6', '9Y6B7', '0Z7C8', '1A8D9', '2B9E0', '3C0F1', '4D1G2', '5E2H3', '6F3I4', '7G4J5', '8H5K6', '9I6L7', '0J7M8', '1K8N9', '2L9O0', '3M0P1', '4N1Q2', '5O2R3', '6P3S4', '7Q4T5', '8R5U6', '9S6V7', '0T7W8', '1U8X9', '2V9Y0', '3W0Z1', '4X1A2', '5Y2B3', '6Z3C4', '7A4D5', '8B5E6', '9C6F7', '0D7G8', '1E8H9', '2F9I0', '3G0J1', '4H1K2', '5I2L3', '6J3M4', 'X5K1N', 'Y6L2P', 'Z7M3Q', 'A8N4R', 'B9P5S', 'C0Q6T', 'D1R7U', 'E2S8V', 'F3T9W', 'G4U0X', 'H5V1Y', 'I6W2Z', 'J7X3A', 'K8Y4B', 'L9Z5C', 'M0A6D', 'N1B7E', 'O2C8F', 'P3D9G', 'Q4E0H', 'R5F1I', 'S6G2J', 'T7H3K', 'U8I4L', 'V9J5M', 'W0K6N', 'X1L7O', 'Y2M8P', 'Z3N9Q', 'A4O0R', 'B5P1S', 'C6Q2T', 'D7R3U', 'E8S4V', 'F9T5W', 'G0U6X', 'H1V7Y', 'I2W8Z', 'J3X9A', 'K4Y0B', 'L5Z1C', 'M6A2D', 'N7B3E', 'O8C4F', 'P9D5G', 'Q0E6H', 'R1F7I', 'S2G8J', 'T3H9K', 'U4I0L', 'V5J1M', 'W6K2N', 'X7L3O', 'Y8M4P', 'Z9N5Q', 'A0O6R', 'B1P7S', 'C2Q8T', 'D3R9U', 'E4S0V', 'F5T1W', 'G6U2X', 'H7V3Y', 'I8W4Z', 'J9X5A', 'K0Y6B', 'L1Z7C', 'M2A8D', 'N3B9E', 'O4C0F', 'P5D1G', 'Q6E2H', 'R7F3I', 'S8G4J', 'T9H5K', 'U0I6L', 'V1J7M', 'W2K8N', 'X3L9O', 'Y4M0P', 'Z5N1Q', 'A6O2R', 'B7P3S', 'C8Q4T', 'D9R5U', 'E0S6V', 'F1T7W', 'G2U8X', 'H3V9Y', 'I4W0Z', 'J5X1A', 'K6Y2B', 'L7Z3C', 'M8A4D', 'N9B5E', 'O0C6F', 'P1D7G', 'Q2E8H', 'R3F9I', 'S4G0J', 'T5H1K', 'U6I2L', 'V7J3M', 'W8K4N', 'X9L5O', 'Y0M6P', 'Z1N7Q', 'A2O8R', 'B3P9S', 'C4Q0T', 'D5R1U', 'E6S2V', 'F7T3W', 'G8U4X', 'H9V5Y', 'I0W6Z', 'J1X7A', 'K2Y8B', 'L3Z9C', 'M4A0D', 'N5B1E', 'O6C2F', 'P7D3G', 'Q8E4H', 'R9F5I', 'S0G6J', 'T1H7K', 'U2I8L', 'V3J9M', 'W4K0N', 'X5L1O', 'Y6M2P', 'Z7N3Q', 'A8O4R', '4Y8Z2', '5A9B3', '6C0D4', '7E1F5', '8G2H6', '9I3J7', '0K4L8', '1M5N9', '2O6P0', '3Q7R1', '4S8T2', '5U9V3', '6W0X4', '7Y1Z5', '8A2B6', '9C3D7', '0E4F8', '1G5H9', '2I6J0', '3K7L1', '4M8N2', '5O9P3', '6Q0R4', '7S1T5', '8U2V6', '9W3X7', '0Y4Z8', '1A5B9', '2C6D0', '3E7F1', '4G8H2', '5I9J3', '6K0L4', '7M1N5', '8O2P6', '9Q3R7', '0S4T8', '1U5V9', '2W6X0', '3Y7Z1', '4A8B2', '5C9D3', '6E0F4', '7G1H5', '8I2J6', '9K3L7', '0M4N8', '1O5P9', '2Q6R0', '3S7T1', '4U8V2', '5W9X3', '6Y0Z4', '7A1B5', '8C2D6', '9E3F7', '0G4H8', '1I5J9', '2K6L0', '3M7N1', '4O8P2', '5Q9R3', '6S0T4', '7U1V5', '8W2X6', '9Y3Z7', '0A4B8', '1C5D9', '2E6F0', '3G7H1', '4I8J2', '5K9L3', '6M0N4', '7O1P5', '8Q2R6', '9S3T7', '0U4V8', '1W5X9', '2Y6Z0', '3A7B1', '4C8D2', '5E9F3', '6G0H4', '7I1J5', '8K2L6', '9M3N7', '0O4P8', '1Q5R9', '2S6T0', '3U7V1', '4W8X2', '5Y9Z3', '6A0B4', '7C1D5', '8E2F6', '9G3H7', '0I4J8', '1K5L9', '2M6N0', '3O7P1', 'V4B6W', 'W5C7X', 'X6D8Y', 'Y7E9Z', 'Z8F0A', 'A9G1B', 'B0H2C', 'C1I3D', 'D2J4E', 'E3K5F', 'F4L6G', 'G5M7H', 'H6N8I', 'I7O9J', 'J8P0K', 'K9Q1L', 'L0R2M', 'M1S3N', 'N2T4O', 'O3U5P', 'P4V6Q', 'Q5W7R', 'R6X8S', 'S7Y9T', 'T8Z0U', 'U9A1V', 'V0B2W', 'W1C3X', 'X2D4Y', 'Y3E5Z', 'Z4F6A', 'A5G7B', 'B6H8C', 'C7I9D', 'D8J0E', 'E9K1F', 'F0L2G', 'G1M3H', 'H2N4I', 'I3O5J', 'J4P6K', 'Z5J7R'];
const MIC_CODES = ['K5Q7L', 'L6R8M', 'M7S9N', 'N8T0O', 'O9U1P', 'P0V2Q', 'Q1W3R', 'R2X4S', 'S3Y5T', 'T4Z6U', 'U5A7V', 'V6B8W', 'W7C9X', 'X8D0Y', 'Y9E1Z', 'Z0F2A', 'A1G3B', 'B2H4C', 'C3I5D', 'D4J6E', 'E5K7F', 'F6L8G', 'G7M9H', 'H8N0I', 'I9O1J', 'J0P2K', 'K1Q3L', 'L2R4M', 'M3S5N', 'N4T6O', 'O5U7P', 'P6V8Q', 'Q7W9R', 'R8X0S', 'S9Y1T', 'T0Z2U', 'U1A3V', 'V2B4W', 'W3C5X', 'X4D6Y', 'Y5E7Z', 'Z6F8A', 'A7G9B', 'B8H0C', 'C9I1D', 'D0J2E', 'E1K3F', 'F2L4G', 'G3M5H', 'H4N6I', 'I5O7J', 'J6P8K', 'K7Q9L', 'L8R0M', 'M9S1N', 'N0T2O', 'O1U3P', 'P2V4Q', 'Q3W5R', 'R4X6S', 'S5Y7T', 'T6Z8U', 'U7A9V', 'V8B0W', 'W9C1X', 'X0D2Y', 'Y1E3Z', 'Z2F4A', 'A3G5B', 'B4H6C', 'C5I7D', 'D6J8E', 'E7K9F', 'F8L0G', 'G9M1H', 'H0N2I', 'I1O3J', 'J2P4K', 'K3Q5L', 'L4R6M', 'M5S7N', 'N6T8O', 'O7U9P', 'P8V0Q', 'Q9W1R', 'R0X2S', 'S1Y3T', 'T2Z4U', 'U3A5V', '2C8D9', '3E9F0', '4G0H1', '5I1J2', '6K2L3', '7M3N4', '8O4P5', '9Q5R6', '0S6T7', '1U7V8', '2W8X9', '3Y9Z0', '4A0B1', '5C1D2', '6E2F3', '7G3H4', '8I4J5', '9K5L6', '0M6N7', '1O7P8', '2Q8R9', '3S9T0', '4U0V1', '5W1X2', '6Y2Z3', '7A3B4', '8C4D5', '9E5F6', '0G6H7', '1I7J8', '2K8L9', '3M9N0', '4O0P1', '5Q1R2', '6S2T3', '7U3V4', '8W4X5', '9Y5Z6', '0A6B7', '1C7D8', '2E8F9', '3G9H0', '4I0J1', '5K1L2', '6M2N3', '7O3P4', '8Q4R5', '9S5T6', '0U6V7', '1W7X8', 'M1D2N', 'N2E3P', 'O3F4Q', 'P4G5R', 'Q5H6S', 'R6I7T', 'S7J8U', 'T8K9V', 'U9L0W', 'V0M1X', 'W1N2Y', 'X2O3Z', 'Y3P4A', 'Z4Q5B', 'A5R6C', 'B6S7D', 'C7T8E', 'D8U9F', 'E9V0G', 'F0W1H', 'G1X2I', 'H2Y3J', 'I3Z4K', 'J4A5L', 'K5B6M', 'L6C7N', 'M7D8P', 'N8E9Q', 'O9F0R', 'P0G1S', 'Q1H2T', 'R2I3U', 'S3J4V', 'T4K5W', 'U5L6X', 'V6M7Y', 'W7N8Z', 'X8O9A', 'Y9P0B', 'Z0Q1C', 'A1R2D', 'B2S3E', 'C3T4F', 'D4U5G', 'E5V6H', 'F6W7I', 'G7X8J', 'H8Y9K', 'I9Z0L', 'J0A1M', 'K1B2N', 'L2C3P', 'M3D4Q', 'N4E5R', 'O5F6S', 'P6G7T', 'Q7H8U', 'R8I9V', 'S9J0W', 'T0K1X', 'U1L2Y', 'V2M3Z', 'W3N4A', 'X4O5B', 'Y5P6C', 'Z6Q7D', 'A7R8E', 'B8S9F', 'C9T0G', 'D0U1H', 'E1V2I', 'F2W3J', 'G3X4K', 'H4Y5L', 'I5Z6M', 'J6A7N', 'K7B8P', 'L8C9Q', 'M9D0R', 'N0E1S', 'O1F2T', 'P2G3U', 'Q3H4V', 'R4I5W', 'S5J6X', 'T6K7Y', 'U7L8Z', 'V8M9A', 'W9N0B', 'X0O1C', 'Y1P2D', 'Z2Q3E', 'A3R4F', 'B4S5G', 'C5T6H', 'D6U7I', 'E7V8J', 'F8W9K', 'G9X0L', 'H0Y1M', 'R2Y3S', 'S3Z4T', 'T4A5U', 'U5B6V', 'V6C7W', 'W7D8X', 'X8E9Y', 'Y9F0Z', 'Z0G1A', 'A1H2B', 'B2I3C', 'C3J4D', 'D4K5E', 'E5L6F', 'F6M7G', 'G7N8H', 'H8O9I', 'I9P0J', 'J0Q1K', 'K1R2L', 'L2S3M', 'M3T4N', 'N4U5O', 'O5V6P', 'P6W7Q', 'Q7X8R', 'R8Y9S', 'S9Z0T', 'T0A1U', 'U1B2V', 'V2C3W', 'W3D4X', 'X4E5Y', 'Y5F6Z', 'Z6G7A', 'A7H8B', 'B8I9C', 'C9J0D', 'D0K1E', 'E1L2F', 'F2M3G', 'G3N4H', 'H4O5I', 'I5P6J', 'J6Q7K', 'K7R8L', 'L8S9M', 'M9T0N', 'N0U1O', 'O1V2P', 'P2W3Q', 'Q3X4R', 'R4Y5S', 'S5Z6T', 'T6A7U', 'U7B8V', 'V8C9W', 'W9D0X', 'X0E1Y', 'Y1F2Z', 'Z2G3A', 'A3H4B', 'B4I5C', 'C5J6D', 'D6K7E', 'E7L8F', 'F8M9G', 'G9N0H', 'H0O1I', 'I1P2J', 'J2Q3K', 'K3R4L', 'L4S5M', 'M5T6N', 'N6U7O', 'O7V8P', 'P8W9Q', 'Q9X0R', 'R0Y1S', 'S1Z2T', 'T2A3U', 'U3B4V', 'V4C5W', 'W5D6X', 'X6E7Y', 'Y7F8Z', 'Z8G9A', 'A9H0B', 'B0I1C', 'C1J2D', 'D2K3E', 'E3L4F', 'F4M5G', 'G5N6H', 'H6O7I', 'I7P8J', 'J8Q9K', 'K9R0L', 'L0S1M', 'M1T2N', '2X4V7', 'A3C9L', 'Q6W2Y', 'T1H8G', 'E4N6D', 'U7V0S', 'I0R5X', 'M2Z1K', 'Y9L3J', 'F8G4P', 'C5D6B', 'H7S0N', 'V1T2Q', 'R3W8E', 'L6X9A', 'P0Y5Z', 'G2B7I', 'N4M1U', 'S9J3F', 'B8K6C', 'D5H7V', 'X1R0T', 'W3Q2L', 'J7A9P', 'O6E8Y', 'Z4G5S', 'T2N1M', '1C3B8', '6F5D9', '8H7J2', 'K0L4R', 'M1P6W', 'Q9S7X', 'Y7V9C', 'A2X1D', 'G6H8F', 'L0K3J', 'P5R7S'];
const MOC_CODES = ['V3Y0A', 'E5Z2G', 'I8U3N', 'U4T6B', 'S9W2Z', 'B4Q1T', 'D8E3V', 'F7G5Y', 'J0N6X', 'N2M4A', 'R1P8C', 'T3S5B', 'V6U7D', 'X9Z0E', 'Z2Y3F', 'C5W4G', 'G8X6H', 'K1J7I', 'M3L9K', 'Q6N0L', 'S0R2M', 'U4T5N', 'W7V8O', 'Y1Z9P', 'A3B0Q', 'D6C2R', 'F9E4S', 'H2G7T', 'J5I8U', 'L8K1V', 'N1M3W', 'P4Q6X', 'R7S9Y', 'T0U2Z', 'V3W5A', 'X6Y8B', 'Z9A1C', 'B2D4E', 'E5F7G', 'G8H0I', 'J1K3L', 'M4N6O', 'P7Q9R', 'S0T2U', 'V3W5X', 'Y6Z8Y', 'B9A1Z', 'E2D4B', 'H5G7C', 'K8J0D', 'N1M3E', 'Q4P6F', 'T7S9G', 'W0V2H', 'Z3Y5I', 'C6X8J', 'F9W1K', 'I2V4L', 'L5U7M', 'O8T0N', 'R1S2O', 'U4R5P', 'X7Q8Q', 'A0P1R', 'D3O4S', 'G6N7T', 'J9M0U', 'M2L3V', 'P5K6W', 'S8J9X', 'V1I2Y', 'Y4H5Z', 'B7G8A', 'E0F1B', 'H3E4C', 'K6D7D', 'N9C0E', 'Q2B3F', 'T5A6G', 'W8Z9H', 'Z1Y2I', 'C4X5J', 'F7W8K', 'I0V1L', 'L3U4M', 'O6T7N', 'R9S0O', 'U2R3P', 'X5Q6Q', 'A8P9R', 'D1O2S', 'G4N5T', 'J7M8U', 'M0L1V', 'P3K4W', 'S6J7X', 'V9I0Y', 'Y2H3Z', 'B5G6A', 'E8F9B', 'H1E2C', 'K4D5D', 'N7C8E', 'Q0B1F', 'T3A4G', 'W6Z7H', 'Z9Y0I', 'C2X3J', 'F5W6K', 'I8V9L', 'L1U2M', 'O4T5N', 'R7S8O', 'U0R1P', 'X3Q4Q', 'A6P7R', 'D9O0S', 'G2N3T', 'J5M6U', 'M8L9V', 'P1K2W', 'S4J5X', 'V7I8Y', 'Y0H1Z', 'B3G4A', 'E6F7B', 'H9E0C', 'K2D3D', 'N5C6E', 'Q8B9F', 'T1A2G', 'W4Z5H', 'Z7Y8I', 'C0X1J', 'F3W4K', 'I6V7L', 'L9U0M', 'O2T3N', 'R5S6O', 'U8R9P', 'X1Q2Q', 'A4P5R', 'D7O8S', 'G0N1T', 'J3M4U', 'M6L7V', 'P9K0W', 'S2J3X', 'V5I6Y', 'Y8H9Z', '4A7B1', '1D0E5', '7G3H9', '0J6K2', '3M9N6', '6P2Q0', '9S5T4', '2V8W8', '5Y1Z3', '8B4A7', 'C7D0E', 'F0G3H', 'I3J6K', 'L6M9N', 'O9P2Q', 'R2S5T', 'U5V8W', 'X8Y1Z', 'A1B4A', 'D4E7B', 'G7H0C', 'J0K3D', 'M3N6E', 'P6Q9F', 'S9T2G', 'V2W5H', 'Y5Z8I', 'B8A1J', 'E1B4K', 'H4C7L', 'K7D0M', 'N0E3N', 'Q3F6O', 'T6G9P', 'W9H2Q', 'Z2I5R', 'C5J8S', 'F8K1T', 'I1L4U', 'L4M7V', 'O7N0W', 'R0O3X', 'U3P6Y', 'X6Q9Z', '1R3S2', '4T6U5', '7W9X8', '0Z2A1', '3B5C4', '6D8E7', '9G1H0', '2J4K3', '5M7N6', '8P0Q9', 'B3R2S', 'E6T5U', 'H9W8X', 'K2Z1A', 'N5B4C', 'Q8D7E', 'T1G0H', 'W4J3K', 'Z7M6N', 'C0P9Q', 'F3S2R', 'I6V5T', 'L9Y8U', 'O2B1A', 'R5E4D', 'U8H7G', 'X1K0J', 'A4N3M', 'D7Q6P', 'G0T9S', 'J3W2V', 'M6Z5Y', 'P9C8B', 'S2F1E', 'V5I4H', 'Y8L7K', 'B1O0N', 'E4R3Q', 'H7U6T', 'K0X9W', 'N3A2Z', 'Q6D5C', 'T9G8F', 'W2J1I', 'Z5M4L', 'C8P7O', 'F1S0R', 'I4V3U', 'L7Y6X', 'O0B9A', 'R3E2D', 'U6H5G', 'X9K8J', 'A2N1M', 'D5Q4P', 'G8T7S', 'J1W0V', 'M4Z3Y', 'P7C6B', 'S0F9E', 'V3I8H', 'Y6L1K', 'B9O4N', 'E2R7Q', 'H5U0T', 'K8X3W', 'N1A6Z', 'Q4D9C', 'T7G2F', 'W0J5I', 'Z3M8L', 'C6P1O', 'F9S4R', 'I2V7U', 'L5Y0X', 'O8B3A', 'R1E6D', 'U4H9G', 'X7K2J', 'A0N5M', 'D3Q8P', 'G6T1S', 'J9W4V', 'M2Z7Y', 'P5C0B', 'S8F3E', 'V1I6H', 'Y4L9K', 'B7O2N', 'E0R5Q', 'H3U8T', 'K6X1W', 'N9A4Z', 'Q2D7C', 'T5G0F', 'W8J3I', 'Z1M6L', 'C4P9O', 'F7S2R', 'I0V5U', 'L3Y8X', 'O6B1A', 'R9E4D', 'U2H7G', 'X5K0J', 'A8N3M', 'D1Q6P', 'G4T9S', 'J7W2V', 'M0Z5Y', 'P3C8B', 'S6F1E', 'V9I4H', 'Y2L7K', 'B5O0N', 'E8R3Q', 'H1U6T', 'K4X9W', 'N7A2Z', 'Q0D5C', 'T3G8F', 'W6J1I', 'Z9M4L', 'C2P7O', 'F5S0R', 'I8V3U', 'L1Y6X', 'O4B9A', 'R7E2D', 'U0H5G', 'X3K8J', 'A6N1M', 'D9Q4P', 'G2T7S', 'J5W0V', 'M8Z3Y', 'P1C6B', 'S4F9E', 'V7I2H', 'Y0L5K', 'B3O8N', 'E6R1Q', 'H9U4T', 'K2X7W', 'N5A0Z', 'Q8D3C', 'T1G6F', 'W4J9I', 'Z7M2L', 'C0P5O', 'F3S8R', 'I6V1U', 'L9Y4X', 'O2B7A', 'R5E0D', 'U8H3G', 'X1K6J', 'A4N9M', 'D7Q2P', 'G0T5S', 'J3W8V', 'M6Z1Y', 'P9C4B', 'S2F7E', 'V5I0H', 'Y8L3K', '3N4P1', '6Q7R5', '9T0U9', '2W3X2', '5Z6A6', '8C9B0', 'BFG3D', 'EIK6H', 'HLO9L', 'KPR2P', '9B1F5']; 

const ALL_GUEST_CODES = [...JIC_CODES, ...JOC_CODES, ...MIC_CODES, ...MOC_CODES];
const VALID_UNIQUE_CODES = [...ALL_GUEST_CODES, ADMIN_CODE];

// --- Event Visibility Rules (Unchanged) ---
const JOC_EVENTS = ["Zufi ki Maayun", "The Nikah Reception"];
const JIC_EVENTS = ["Haldi", "Zufi ki Maayun", "The Nikah Reception", "Mehendi", "The Nikah", "The Walima"];
const MIC_EVENTS = ["The Hakdara Ceremony", "Haldi", "Zufi ki Maayun", "The Nikah Reception", "Mehendi", "The Nikah", "The Walima"];
const MOC_EVENTS = ["The Walima"];
const PUBLIC_EVENTS = ["The Nikah Reception", "The Walima"];

// --- Reusable UI Components (Unchanged) ---
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg shadow-xl p-6 w-full max-w-md mx-auto relative border border-gray-700">
        {onClose && <button onClick={onClose} className="absolute top-3 right-3 text-gray-400 hover:text-white text-2xl font-bold">&times;</button>}
        {children}
      </div>
    </div>
  );
};

const Navbar = ({ setCurrentPage, handleLogout, isAdmin, guestCode }) => (
    <nav className="bg-black p-4 shadow-lg"><div className="container mx-auto flex flex-col items-center"><div className="flex flex-wrap justify-center space-x-4 mb-2"><NavLink onClick={() => setCurrentPage('home')}>Home</NavLink><NavLink onClick={() => setCurrentPage('eventDetails')}>Event Details</NavLink><NavLink onClick={() => setCurrentPage('rsvp')}>RSVP</NavLink><NavLink onClick={() => setCurrentPage('accommodation')}>Accommodation</NavLink><NavLink onClick={() => setCurrentPage('giftRegistry')}>Duas</NavLink><NavLink onClick={() => setCurrentPage('gallery')}>Gallery</NavLink></div><div className="flex flex-wrap justify-center space-x-4"><NavLink onClick={() => setCurrentPage('contact')}>Contact</NavLink>{isAdmin && <NavLink onClick={() => setCurrentPage('adminPanel')}>Admin Panel</NavLink>}{guestCode ? (<button onClick={handleLogout} className="text-stone-200 hover:bg-gray-800 hover:text-white transition-colors duration-200 text-lg font-semibold px-3 py-1 rounded-md">Logout</button>) : (<NavLink onClick={() => setCurrentPage('login')}>Login</NavLink>)}</div></div></nav>
);
const NavLink = ({ children, onClick }) => (<button onClick={onClick} className="text-stone-200 hover:bg-gray-800 hover:text-white transition-colors duration-200 text-lg font-semibold px-3 py-1 rounded-md">{children}</button>);

// --- Page Components ---
const HomePage = ({ setCurrentPage, isAdmin, guestCode, handleLogout }) => {
  const websiteLink = window.location.href;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(websiteLink)}`;
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-2 text-stone-100">
      <div className="bg-gray-900 rounded-xl shadow-2xl p-4 md:p-6 text-center max-w-3xl w-full transform transition-all duration-500 hover:scale-105 border border-gray-700">
        <div className="mb-6">
          <img 
            src="https://as2.ftcdn.net/v2/jpg/06/26/10/37/1000_F_626103774_twshHrUzApupNUihit0SG2ouMEY9U7bp.jpg" 
            alt="Hazique & Zaufesha" 
            className="w-full h-auto max-w-md mx-auto rounded-lg object-cover"
            onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/800x600/111827/44403c?text=Your+Photo+Here'; }}
          />
        </div>
        <h2 className="text-3xl md:text-6xl font-extrabold text-stone-100 mb-6 animate-fade-in-down font-nanum-myeongjo">HAZIQUE & ZAUFESHA</h2>
        <p className="text-2xl md:text-3xl text-gray-300 mb-8 font-light leading-relaxed animate-fade-in font-satisfy">We are so excited to celebrate our special day with all of you. Explore our website for all the details.</p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 mb-10">
          <button onClick={() => setCurrentPage('rsvp')} className="bg-stone-200 text-black px-8 py-4 rounded-full text-xl shadow-lg hover:bg-stone-300 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-stone-400 font-finger-paint">RSVP Now!</button>
          <button onClick={() => setCurrentPage('gallery')} className="bg-stone-200 text-black px-8 py-4 rounded-full text-xl shadow-lg hover:bg-stone-300 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-stone-400 font-finger-paint">Visit The Gallery!</button>
        </div>
        <div className="flex flex-col items-center gap-y-2 mt-10 mb-10">
          <div className="flex flex-wrap justify-center gap-x-4">
            <NavLink onClick={() => setCurrentPage('home')}>Home</NavLink>
            <NavLink onClick={() => setCurrentPage('eventDetails')}>Event Details</NavLink>
            <NavLink onClick={() => setCurrentPage('rsvp')}>RSVP</NavLink>
            <NavLink onClick={() => setCurrentPage('accommodation')}>Accommodation</NavLink>
            <NavLink onClick={() => setCurrentPage('giftRegistry')}>Duas</NavLink>
            <NavLink onClick={() => setCurrentPage('gallery')}>Gallery</NavLink>
          </div>
          <div className="flex flex-wrap justify-center gap-x-4">
            <NavLink onClick={() => setCurrentPage('contact')}>Contact</NavLink>
            {isAdmin && <NavLink onClick={() => setCurrentPage('adminPanel')}>Admin Panel</NavLink>}
            {guestCode ? (<button onClick={handleLogout} className="text-stone-200 hover:bg-gray-800 hover:text-white transition-colors duration-200 text-lg font-semibold px-3 py-1 rounded-md">Logout</button>) : (<NavLink onClick={() => setCurrentPage('login')}>Login</NavLink>)}
          </div>
        </div>
        <div className="mt-10 p-6 bg-gray-800 rounded-lg shadow-inner">
          <h3 className="text-2xl font-bold text-stone-100 mb-4">Quick Access QR Code</h3>
          <img src={qrCodeUrl} alt="QR Code to Wedding Website" className="mx-auto rounded-lg shadow-md" />
          <p className="text-gray-400 mt-4 text-lg">Scan this to quickly access our website!</p>
        </div>
      </div>
    </div>
  );
};
const allEvents = [ { title: "The Hakdara Ceremony", date: "Sunday, November 16, 2025", time: "11:00 AM - 8:00 PM", venue: "Address: The Mandlik House, 701, NG Vedant, Opp. RBK School, Beverly Park, Mira Road East.", mapLink: "https://maps.app.goo.gl/ciz4tt3QAHicbz8AA", mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3765.869308151048!2d72.86878347593169!3d19.28723364491768!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b0e8ffffffff%3A0x859c8c32d4323ab2!2sNG%20VEDANT!5e0!3m2!1sen!2sin!4v1724089855519!5m2!1sen!2sin", timeline: [] }, { title: "Zufi ki Maayun", date: "Wednesday, November 19, 2025", time: "5:00 PM - 11:00 PM", venue: "TRF Club, Telco Colony, Jamshedpur, Jharkhand 831004", mapLink: "https://maps.app.goo.gl/NJLfAzEsRgw8NFjc6", mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3678.78452336825!2d86.1609121759082!3d22.77326882672439!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f5e3895aaaaaab%3A0x445ce31d162624b5!2sTRF%20Club!5e0!3m2!1sen!2sin!4v1725834444583!5m2!1sen!2sin", timeline: [] }, { title: "Haldi", date: "Thursday, November 20, 2025", time: "10:00 AM - 2:00 PM", venue: "TRF Club, Telco Colony, Jamshedpur, Jharkhand 831004", mapLink: "https://maps.app.goo.gl/NJLfAzEsRgw8NFjc6", mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3678.78452336825!2d86.1609121759082!3d22.77326882672439!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f5e3895aaaaaab%3A0x445ce31d162624b5!2sTRF%20Club!5e0!3m2!1sen!2sin!4v1725834444583!5m2!1sen!2sin", timeline: [] }, { title: "Mehendi", date: "Thursday, November 20, 2025", time: "5:00 PM - 9:00 PM", venue: "TRF Club, Telco Colony, Jamshedpur, Jharkhand 831004", mapLink: "https://maps.app.goo.gl/NJLfAzEsRgw8NFjc6", mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3678.78452336825!2d86.1609121759082!3d22.77326882672439!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f5e3895aaaaaab%3A0x445ce31d162624b5!2sTRF%20Club!5e0!3m2!1sen!2sin!4v1725834444583!5m2!1sen!2sin", timeline: [] }, { title: "The Nikah", date: "Friday, November 21, 2025", time: "1:30 PM - 4:00 PM", venue: "Telco Recreation Club, HS Road, Telco Colony, Jamshedpur, Jharkhand 831004", mapLink: "https://maps.app.goo.gl/wjVagG9Mk9p3wi2T9", mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3678.775932591128!2d86.16053461540517!3d22.77361198507944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f5e390a3623c53%3A0x3379126a1758c54!2sTelco%20Recreation%20Club!5e0!3m2!1sen!2sin!4v1678901234567!5m2!1sen!2sin", timeline: [ { time: "1:30 PM", event: "Guest Arrival" }, { time: "2:00 PM", event: "Nikah Ceremony" }, { time: "3:00 PM", event: "Dua & Blessings" }, { time: "3:30 PM", event: "Lunch" }, ] }, { title: "The Nikah Reception", date: "Friday, November 21, 2025", time: "6:00 PM - 11:00 PM", venue: "Telco Recreation Club, HS Road, Telco Colony, Jamshedpur, Jharkhand 831004", mapLink: "https://maps.app.goo.gl/wjVagG9Mk9p3wi2T9", mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3678.775932591128!2d86.16053461540517!3d22.77361198507944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f5e390a3623c53%3A0x3379126a1758c54!2sTelco%20Recreation%20Club!5e0!3m2!1sen!2sin!4v1678901234567!5m2!1sen!2sin", timeline: [ { time: "6:00 PM", event: "Guest Arrival & Welcome" }, { time: "7:00 PM", event: "Couple's Grand Entrance" }, { time: "7:30 PM", event: "Dinner Service Begins" }, { time: "9:00 PM", event: "Rukhsati" }, ] }, { title: "The Walima", date: "Sunday, November 30, 2025", time: "5:00 PM - 10:00 PM", venue: "Hotel R K Inn, Bharti Nagar, Mira Road, Mira Bhayandar, Maharashtra 401107", mapLink: "https://www.google.com/maps/search/?api=1&query=Hotel+R+K+Inn,+Bharti+Nagar,+Mira+Road,+Mira+Bhayandar,+Maharashtra+401107", mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3766.08407335299!2d72.86895301538356!3d19.2782209869717!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b06bffffffff%3A0x457f659286f5029!2sHotel%20RK%20Inn!5e0!3m2!1sen!2sin!4v1678901234567!5m2!1sen!2sin", timeline: [ { time: "5:00 PM", event: "Guest Arrival & Welcome Drinks" }, { time: "6:00 PM", event: "Dinner Service Begins" }, { time: "8:00 PM", event: "Speeches & Toasts" }, { time: "9:00 PM", event: "Cake Cutting" }, ] } ];
const getVisibleEvents = (guestCode) => { if (!guestCode) return PUBLIC_EVENTS; if (guestCode === ADMIN_CODE) return allEvents.map(e => e.title); if (JIC_CODES.includes(guestCode)) return JIC_EVENTS; if (JOC_CODES.includes(guestCode)) return JOC_EVENTS; if (MIC_CODES.includes(guestCode)) return MIC_EVENTS; if (MOC_CODES.includes(guestCode)) return MOC_EVENTS; return PUBLIC_EVENTS; };

const EventDetailsPage = ({ guestCode, setCurrentPage, setLoginRedirectPath }) => { 
    useEffect(() => {
        if (!guestCode) {
            setLoginRedirectPath('eventDetails');
            setCurrentPage('login');
        }
    }, [guestCode, setCurrentPage, setLoginRedirectPath]);

    if (!guestCode) {
        return null; // Return nothing while redirecting
    }

    const visibleEventTitles = getVisibleEvents(guestCode); 
    const eventsToDisplay = allEvents.filter(event => visibleEventTitles.includes(event.title)); 
    
    return ( 
        <div className="min-h-screen bg-black p-3 text-stone-100">
            <div className="container mx-auto bg-gray-900 rounded-xl shadow-2xl p-4 md:p-6 mt-8 border border-gray-700">
                <h2 className="text-4xl font-extrabold text-stone-100 mb-8 text-center">Event Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {eventsToDisplay.map(event => (
                        <section key={event.title} className="p-6 bg-gray-800 rounded-lg shadow-md">
                            <h3 className="text-3xl font-bold text-stone-200 mb-4">{event.title}</h3>
                            <p className="text-lg text-gray-300 mb-2"><span className="font-semibold">Date:</span> {event.date}</p>
                            <p className="text-lg text-gray-300 mb-2"><span className="font-semibold">Time:</span> {event.time}</p>
                            <p className="text-lg text-gray-300 mb-4"><span className="font-semibold">Venue:</span> {event.venue}</p>
                            {event.timeline.length > 0 && (
                                <>
                                    <h4 className="text-2xl font-bold text-stone-200 mt-6 mb-3">Timeline of Events</h4>
                                    <ul className="list-disc list-inside text-lg text-gray-300 space-y-2">
                                        {event.timeline.map(item => (
                                            <li key={item.event}><span className="font-semibold">{item.time}:</span> {item.event}</li>
                                        ))}
                                    </ul>
                                </>
                            )}
                            <a href={event.mapLink} target="_blank" rel="noopener noreferrer" className="block mt-6">
                                <div className="relative w-full h-60 rounded-lg overflow-hidden shadow-lg cursor-pointer">
                                    <iframe src={event.mapEmbed} width="100%" height="100%" style={{ border: 0, pointerEvents: 'none' }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title={`${event.title} Location`}></iframe>
                                </div>
                            </a>
                        </section>
                    ))}
                </div>
            </div>
        </div> 
    ); 
};

const LoginPage = ({ handleLogin, setCurrentPage, loginRedirectPath }) => { 
    const [code, setCode] = useState(''); 
    const [error, setError] = useState(''); 

    const handleCodeChange = (e) => {
        const value = e.target.value.toUpperCase();
        const filteredValue = value.replace(/[^A-Z0-9]/g, ''); // Allow only uppercase letters and numbers
        setCode(filteredValue);
    };

    const handleSubmit = (e) => { 
        e.preventDefault(); 
        if (VALID_UNIQUE_CODES.includes(code.trim())) { 
            handleLogin(code.trim()); 
            setCurrentPage(loginRedirectPath); 
        } else { 
            setError('code not accepted, retry.'); // Update the error message
        } 
    }; 
    
    return ( 
        <div className="min-h-screen bg-black flex items-center justify-center p-4 text-stone-100">
            <div className="bg-gray-900 rounded-xl shadow-2xl p-8 w-full max-w-md border border-gray-700">
                <h2 className="text-4xl font-extrabold text-stone-100 mb-8 text-center">Enter Access Code</h2>
                <p className="text-center text-lg text-gray-300 mb-8">Please enter your unique code (mentioned in the wedding invitation) to view the photo gallery and RSVP.</p>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <input 
                        type="text" 
                        value={code} 
                        onChange={handleCodeChange} // Use the new handler
                        placeholder="Unique Code" 
                        className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg text-center"
                    />
                    {error && <p className="text-red-500 text-center text-sm">{error}</p>}
                    <button type="submit" className="w-full bg-stone-200 text-black px-6 py-3 rounded-lg text-xl font-semibold shadow-lg hover:bg-stone-300">Enter</button>
                </form>
            </div>
        </div> 
    ); 
};

const AccommodationPage = ({ guestCode, setCurrentPage, setLoginRedirectPath, isAdmin }) => { 
    useEffect(() => { 
        if (!guestCode) { 
            setLoginRedirectPath('accommodation'); 
            setCurrentPage('login'); 
        } 
    }, [guestCode, setCurrentPage, setLoginRedirectPath]); 

    const isAuthorized = JIC_CODES.includes(guestCode) || MIC_CODES.includes(guestCode) || isAdmin; 
    
    if (!guestCode) return null; 
    
    if (!isAuthorized) { 
        return ( 
            <div className="min-h-screen bg-black flex items-center justify-center p-4 text-stone-100">
                <div className="bg-gray-900 rounded-xl shadow-2xl p-8 w-full max-w-md border border-gray-700 text-center">
                    <h2 className="text-3xl font-extrabold text-stone-100 mb-4">Access Denied</h2>
                    <p className="text-lg text-gray-300">This page is only available to specific guests.</p>
                </div>
            </div> 
        ); 
    } 
    
    return ( 
        <div className="min-h-screen bg-black p-3 text-stone-100">
            <div className="container mx-auto bg-gray-900 rounded-xl shadow-2xl p-4 md:p-6 mt-8 border border-gray-700">
                <h2 className="text-4xl font-extrabold text-stone-100 mb-8 text-center">Accommodation</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <section className="p-6 bg-gray-800 rounded-lg shadow-md">
                        <h3 className="text-3xl font-bold text-stone-200 mb-4">Jamshedpur Stay</h3>
                        <p className="text-lg text-gray-300 mb-2"><span className="font-semibold">Check-in:</span> Wednesday, November 19, 2025, 12:00 PM</p>
                        <p className="text-lg text-gray-300 mb-4"><span className="font-semibold">Check-out:</span> Saturday, November 22, 2025, 11:00 AM</p>
                        <p className="text-lg text-gray-300 mb-4">Accommodation is arranged at The Altira Hotel, Plot No.300, Zone 5, Birsanagar, Telco Colony, Jamshedpur, Jharkhand 831004. Please confirm your travel dates via RSVP.</p>
                        <a href="https://maps.app.goo.gl/aqrU9nMRqWjwN48A9" target="_blank" rel="noopener noreferrer" className="block mt-6">
                            <div className="relative w-full h-60 rounded-lg overflow-hidden shadow-lg cursor-pointer">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3678.969248744165!2d86.15175967590807!3d22.76616422682979!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f5e3f4e3852c09%3A0x6733e83956395b2!2sThe%20Altira%20Hotel!5e0!3m2!1sen!2sin!4v1725883584989!5m2!1sen!2sin" width="100%" height="100%" style={{ border: 0, pointerEvents: 'none' }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Jamshedpur Accommodation"></iframe>
                            </div>
                        </a>
                    </section>
                    <section className="p-6 bg-gray-800 rounded-lg shadow-md">
                        <h3 className="text-3xl font-bold text-stone-200 mb-4">Mumbai Stay</h3>
                        <p className="text-lg text-gray-300 mb-2"><span className="font-semibold">Check-in:</span> Saturday, November 29, 2025, 12:00 PM</p>
                        <p className="text-lg text-gray-300 mb-4"><span className="font-semibold">Check-out:</span> Monday, December 1, 2025, 11:00 AM</p>
                        <p className="text-lg text-gray-300 mb-4">Accommodation is arranged at Savana The Boutique Hotel, Building No 6, Hotel Unit, H-1, opp. Mari Gold Road, Beverly Park, Mira Road East, Thane, Mira Bhayandar, Maharashtra 401107. Please confirm your travel dates via RSVP.</p>
                        <a href="https://maps.app.goo.gl/qR3u4YrRpTGc95m69" target="_blank" rel="noopener noreferrer" className="block mt-6">
                            <div className="relative w-full h-60 rounded-lg overflow-hidden shadow-lg cursor-pointer">
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3766.071987518559!2d72.8715834759203!3d19.278772245228587!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b06a4aaaaaab%3A0x7d12f127c569bd89!2sSavana%20the%20boutique%20Hotel!5e0!3m2!1sen!2sin!4v1725890259779!5m2!1sen!2sin" width="100%" height="100%" style={{ border: 0, pointerEvents: 'none' }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Mumbai Accommodation"></iframe>
                            </div>
                        </a>
                    </section>
                </div>
            </div>
        </div> 
    ); 
};
const ContactPage = () => { const [formData, setFormData] = useState({ name: '', email: '', message: '' }); const [isSubmitting, setIsSubmitting] = useState(false); const [submitMessage, setSubmitMessage] = useState(''); const [isModalOpen, setIsModalOpen] = useState(false); const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value }); const handleSubmit = async (e) => { e.preventDefault(); setIsSubmitting(true); console.log('Contact form submitted:', formData); setSubmitMessage('Message sent successfully!'); setIsModalOpen(true); setFormData({ name: '', email: '', message: '' }); setIsSubmitting(false); }; return ( <div className="min-h-screen bg-black p-3 text-stone-100"><div className="container mx-auto bg-gray-900 rounded-xl shadow-2xl p-4 mt-8 border border-gray-700"><h2 className="text-4xl font-extrabold mb-8 text-center">Contact Us</h2><form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6"><input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Your Name" className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg"/><input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Your Email" className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg"/><textarea name="message" value={formData.message} onChange={handleChange} rows="6" required placeholder="Your Message" className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg"></textarea><button type="submit" disabled={isSubmitting} className="w-full bg-stone-200 text-black px-6 py-3 rounded-lg text-xl font-semibold">{isSubmitting ? 'Sending...' : 'Send Message'}</button></form></div><Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}><h3 className="text-2xl font-bold mb-4 text-center text-stone-100">Message Status</h3><p className="text-lg text-gray-300 text-center">{submitMessage}</p></Modal></div> ); };

// --- ** MODIFIED COMPONENTS ** ---

const RSVPPage = ({ guestCode, setCurrentPage, setLoginRedirectPath }) => {
  const [formData, setFormData] = useState({ fullName: '', comingFrom: '', attending: '', guests: 1, eventsAttending: [], message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // FIX: Moved useEffect to top level and put condition inside.
  useEffect(() => {
    if (!guestCode) {
      setLoginRedirectPath('rsvp');
      setCurrentPage('login');
    }
  }, [guestCode, setCurrentPage, setLoginRedirectPath]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/rsvps`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, guestCode }),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      setSubmitMessage('Your RSVP has been submitted successfully! Thank you!');
      setFormData({ fullName: '', comingFrom: '', attending: '', guests: 1, eventsAttending: [], message: '' });
    } catch (error) {
      console.error('Error submitting RSVP:', error);
      setSubmitMessage(`Failed to submit RSVP: ${error.message}`);
    } finally {
      setIsSubmitting(false);
      setIsModalOpen(true);
    }
  };
  
  // Early return after hooks if not logged in
  if (!guestCode) { return null; }

  const visibleEventTitles = getVisibleEvents(guestCode);
  const eventsToDisplay = allEvents.filter(event => visibleEventTitles.includes(event.title));
  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleEventChange = (e) => { const { value, checked } = e.target; setFormData(prev => ({ ...prev, eventsAttending: checked ? [...prev.eventsAttending, value] : prev.eventsAttending.filter(event => event !== value) })); };
  return ( <div className="min-h-screen bg-black p-3 text-stone-100"><div className="container mx-auto bg-gray-900 rounded-xl shadow-2xl p-4 md:p-6 mt-8 border border-gray-700"><h2 className="text-4xl font-extrabold mb-8 text-center">RSVP</h2><form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6"><input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required placeholder="Your Full Name" className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg"/><input type="text" name="comingFrom" value={formData.comingFrom} onChange={handleChange} required placeholder="Locality?" className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg"/><div className="flex items-center space-x-4"><label className="flex items-center text-lg text-gray-300"><input type="radio" name="attending" value="Yes" checked={formData.attending === 'Yes'} onChange={handleChange} required className="form-radio mr-2 h-5 w-5"/>Yes, Attending</label><label className="flex items-center text-lg text-gray-300"><input type="radio" name="attending" value="No" checked={formData.attending === 'No'} onChange={handleChange} required className="form-radio mr-2 h-5 w-5"/>No, Regretfully</label></div><div><label htmlFor="guests" className="block text-lg text-gray-300 mb-2">Number of Guests</label><select name="guests" id="guests" value={formData.guests} onChange={handleChange} className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg">{[...Array(10).keys()].map(i => (<option key={i + 1} value={i + 1}>{i + 1}</option>))}</select></div><div><label className="block text-lg text-gray-300 mb-2">Which events will you be attending?</label><div className="space-y-2">{eventsToDisplay.map(event => ( <label key={event.title} className="flex items-center text-lg text-gray-300"><input type="checkbox" value={event.title} onChange={handleEventChange} checked={formData.eventsAttending.includes(event.title)} className="form-checkbox mr-2 h-5 w-5" />{event.title}</label>))}</div></div><textarea name="message" value={formData.message} onChange={handleChange} rows="4" placeholder="Any comments?" className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg"></textarea><button type="submit" disabled={isSubmitting} className="w-full bg-stone-200 text-black px-6 py-3 rounded-lg text-xl font-semibold shadow-lg hover:bg-stone-300 transition duration-300 disabled:opacity-50">{isSubmitting ? 'Submitting...' : 'Submit'}</button></form></div><Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}><h3 className="text-2xl font-bold mb-4 text-center text-stone-100">RSVP Status</h3><p className="text-lg text-gray-300 text-center">{submitMessage}</p></Modal></div> );
};

const GiftRegistryPage = ({ guestCode, setCurrentPage, setLoginRedirectPath }) => {
  const [duas, setDuas] = useState([]);
  const [newDua, setNewDua] = useState({ name: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // FIX: Moved useEffect to top level and put condition inside.
  useEffect(() => {
    if (!guestCode) {
      setLoginRedirectPath('giftRegistry');
      setCurrentPage('login');
    }
  }, [guestCode, setCurrentPage, setLoginRedirectPath]);
  
  const fetchDuas = async () => {
    try {
      const response = await fetch(new URL(`${API_BASE_URL}/duas`, window.location.origin));
      const data = await response.json();
      setDuas(data);
    } catch (error) {
      console.error("Failed to fetch duas:", error);
    }
  };

  useEffect(() => {
    if (guestCode) fetchDuas();
  }, [guestCode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newDua.name.trim() || !newDua.message.trim()) {
      setSubmitMessage("Please fill out both your name and your dua.");
      setIsModalOpen(true);
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await fetch(new URL(`${API_BASE_URL}/duas`, window.location.origin), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newDua, guestCode }),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      setSubmitMessage("Thank you for your dua! It has been sent for review.");
      setNewDua({ name: '', message: '' });
    } catch (error) {
      console.error("Error submitting dua:", error);
      setSubmitMessage(`Sorry, there was an error submitting your dua: ${error.message}`);
    } finally {
      setIsSubmitting(false);
      setIsModalOpen(true);
    }
  };
  
  // Early return after hooks if not logged in
  if (!guestCode) { return null; }
  
  const handleChange = (e) => setNewDua(prev => ({ ...prev, [e.target.name]: e.target.value }));
  return ( <div className="min-h-screen bg-black p-3 text-stone-100"><div className="container mx-auto bg-gray-900 rounded-xl shadow-2xl p-4 md:p-6 mt-8 border border-gray-700"><h2 className="text-4xl font-extrabold mb-4 text-center">Duas</h2><p className="text-xl text-gray-300 mb-8 text-center">Your presence is the only gift we need! If you wish to give something, we have a Duas section. Please leave us some great duas.</p><div className="max-w-2xl mx-auto"><div className="bg-gray-800 rounded-lg p-4 h-96 overflow-y-auto mb-6 flex flex-col space-y-4">{duas.map(dua => ( <div key={dua.id} className="bg-gray-700 rounded-lg p-3 shadow"><p className="text-white font-semibold">{dua.name}</p><p className="text-gray-300">{dua.message}</p></div>))}</div><form onSubmit={handleSubmit} className="space-y-4"><input type="text" name="name" value={newDua.name} onChange={handleChange} placeholder="Your Name" className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg" /><textarea name="message" value={newDua.message} onChange={handleChange} rows="3" placeholder="Leave your dua here..." className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg"></textarea><button type="submit" disabled={isSubmitting} className="w-full bg-stone-200 text-black px-6 py-3 rounded-lg text-xl font-semibold shadow-lg hover:bg-stone-300 transition duration-300 disabled:opacity-50">{isSubmitting ? 'Sending...' : 'Send Dua'}</button></form></div></div><Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}><h3 className="text-2xl font-bold mb-4 text-center text-stone-100">Thank You!</h3><p className="text-lg text-gray-300 text-center">{submitMessage}</p></Modal></div> );
};

const GalleryPage = ({ guestCode, setCurrentPage, setLoginRedirectPath, isAdmin }) => {
    const [mediaItems, setMediaItems] = useState([]);
    const [mediaType, setMediaType] = useState('images');
    const [uploading, setUploading] = useState(false);
    const [selectedMedia, setSelectedMedia] = useState(null);
    const [modalMessage, setModalMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const fileInputRef = useRef(null);

    const fetchMedia = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/media?approved=true`);
            const data = await response.json();
            setMediaItems(data);
        } catch (error) {
            console.error("Failed to fetch media:", error);
        }
    };

    useEffect(() => {
        if (guestCode) fetchMedia();
    }, [guestCode]);
    
    useEffect(() => { 
        if (!guestCode) { 
            setLoginRedirectPath('gallery'); 
            setCurrentPage('login'); 
        } 
    }, [guestCode, setCurrentPage, setLoginRedirectPath]);

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploading(true); 

        const fileType = file.name.toLowerCase().endsWith('.heic') || file.type.startsWith('video/') ? 'video' : 'image';

        try {
            const response = await fetch(`${API_BASE_URL}/upload`, {
                method: 'POST',
                headers: {
                    'Content-Type': file.type,
                    'X-File-Name': encodeURIComponent(file.name),
                    'X-File-Type': fileType,
                    'X-Guest-Code': guestCode,
                },
                body: file,
            });

            if (!response.ok) {
                let errorDetails = `HTTP status ${response.status}`;
                try {
                    const errorData = await response.json();
                    errorDetails = errorData.error || JSON.stringify(errorData);
                } catch (jsonError) {
                    errorDetails = await response.text();
                }
                throw new Error(errorDetails);
            }

            setModalMessage("Thank you! Your media has been submitted for approval.");
            setIsModalOpen(true);
            fetchMedia();
            
        } catch (error) {
            console.error("Upload failed:", error);
            setModalMessage(`Upload failed: ${error.message}`);
            setIsModalOpen(true);
        } finally {
            setUploading(false);
        }
    };
    
    const downloadMedia = async (url) => {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Network response was not ok');
            const blob = await response.blob();
            const objectUrl = window.URL.createObjectURL(blob);
            
            const link = document.createElement('a');
            link.href = objectUrl;
            
            const fileName = url.substring(url.lastIndexOf('/') + 1) || 'download';
            link.setAttribute('download', fileName);
            
            document.body.appendChild(link);
            link.click();
            
            document.body.removeChild(link);
            window.URL.revokeObjectURL(objectUrl);
        } catch (error) {
            console.error("Download failed:", error);
            setModalMessage(`Download failed: ${error.message}. You can try right-clicking the link to save.`);
            setIsModalOpen(true);
        }
    };

    const isAuthorized = JIC_CODES.includes(guestCode) || MIC_CODES.includes(guestCode) || isAdmin;
    if (!guestCode) return null;
    if (!isAuthorized) { return ( <div className="min-h-screen bg-black flex items-center justify-center p-4 text-stone-100"><div className="bg-gray-900 rounded-xl shadow-2xl p-8 w-full max-w-md border border-gray-700 text-center"><h2 className="text-3xl font-extrabold text-stone-100 mb-4">Access Denied</h2><p className="text-lg text-gray-300">This page is only available to specific guests.</p></div></div> ); }
    const filteredMedia = mediaItems.filter(item => item.type === mediaType.slice(0, -1));
    return ( <div className="min-h-screen bg-black p-3 text-stone-100"><div className="container mx-auto bg-gray-900 rounded-xl shadow-2xl p-4 mt-8 border border-gray-700"><h2 className="text-4xl font-extrabold mb-8 text-center">Gallery</h2><div className="flex justify-center mb-6"><button onClick={() => fileInputRef.current.click()} className="bg-stone-200 text-black px-6 py-3 rounded-lg text-xl font-semibold shadow-lg hover:bg-stone-300 transition duration-300" disabled={uploading}>{uploading ? 'Uploading...' : 'Upload Media'}</button><input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*,video/*,.heic" /></div><div className="flex justify-center space-x-4 mb-8"><button onClick={() => setMediaType('images')} className={`px-6 py-2 rounded-lg font-semibold ${mediaType === 'images' ? 'bg-stone-200 text-black' : 'bg-gray-700'}`}>Images</button><button onClick={() => setMediaType('videos')} className={`px-6 py-2 rounded-lg font-semibold ${mediaType === 'videos' ? 'bg-stone-200 text-black' : 'bg-gray-700'}`}>Videos</button></div><div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">{filteredMedia.length > 0 ? filteredMedia.map(item => ( <div key={item.id} className="relative rounded-lg overflow-hidden group">{item.type === 'image' ? ( <img src={item.url} alt="Gallery content" className="w-full h-full object-cover transform transition-transform duration-300"/> ) : ( <video src={item.url} className="w-full h-full object-cover"></video> )}<div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center space-x-4"><button onClick={() => setSelectedMedia(item)} className="p-3 bg-white text-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform hover:scale-110"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg></button><button onClick={() => downloadMedia(item.url)} className="p-3 bg-white text-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform hover:scale-110"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg></button></div></div> )) : ( <p className="text-center text-lg text-gray-300 col-span-full">No {mediaType} yet. Be the first to upload!</p> )}</div></div>{selectedMedia && ( <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4" onClick={() => setSelectedMedia(null)}>{selectedMedia.type === 'image' ? ( <img src={selectedMedia.url} alt="Full screen view" className="max-w-full max-h-full rounded-lg"/> ) : ( <video controls autoPlay src={selectedMedia.url} className="max-w-full max-h-full rounded-lg"></video> )}</div> )}<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}><h3 className="text-2xl font-bold mb-4 text-center text-stone-100">Upload Status</h3><p className="text-lg text-gray-300 text-center">{modalMessage}</p></Modal></div> );
};

const AdminPanelPage = () => {
  const [rsvps, setRsvps] = useState([]);
  const [duas, setDuas] = useState([]);
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
      setLoading(true);
      try {
          const [rsvpsRes, duasRes, mediaRes] = await Promise.all([
              fetch(`${API_BASE_URL}/rsvps`),
              fetch(`${API_BASE_URL}/duas/all`),
              fetch(`${API_BASE_URL}/media`),
          ]);
          setRsvps(await rsvpsRes.json());
          setDuas(await duasRes.json());
          setMedia(await mediaRes.json());
      } catch (error) {
          console.error("Failed to fetch admin data:", error);
      } finally {
          setLoading(false);
      }
  };
  
  useEffect(() => { fetchData(); }, []);

  const updateDuaStatus = async (id, status) => {
    await fetch(`${API_BASE_URL}/duas/${id}`, { method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({ status }) });
    fetchData(); // Refresh data
  };

  const handleApproveMedia = async (id) => {
    await fetch(`${API_BASE_URL}/media/${id}`, { method: 'PUT' });
    fetchData(); // Refresh data
  };
  
  const handleRejectMedia = async (mediaId, mediaUrl) => {
      try {
          const key = mediaUrl.substring(mediaUrl.lastIndexOf('/') + 1);
          await fetch(`${API_BASE_URL}/delete-object`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ key }) });
          await fetch(`${API_BASE_URL}/media/${mediaId}`, { method: 'DELETE' });
          fetchData(); // Refresh data
      } catch (error) { console.error("Error rejecting media:", error); }
  };

  const downloadMedia = (url) => {
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', '');
    link.setAttribute('target', '_blank');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-white">Loading Admin Data...</div>;

  return (
    <div className="min-h-screen bg-black p-3 text-stone-100">
      <div className="container mx-auto bg-gray-900 rounded-xl shadow-2xl p-4 mt-8 border border-gray-700">
        <h2 className="text-4xl font-extrabold mb-8 text-center">Admin Panel</h2>
        
        <section className="mb-12 p-6 bg-gray-800 rounded-lg shadow-md"><h3 className="text-3xl font-bold text-stone-200 mb-6">Approve Media</h3><div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">{media.filter(m => !m.approved).map(item => ( <div key={item.id} className="bg-gray-700 p-2 rounded-lg"><p className="text-xs text-gray-400 mb-1">From: {item.guestCode}</p>{item.type === 'image' ? <img src={item.url} alt="Awaiting approval" className="w-full h-40 object-cover rounded"/> : <video src={item.url} className="w-full h-40 object-cover rounded" controls/>}<div className="flex justify-around items-center mt-2"><button onClick={() => handleApproveMedia(item.id)} className="bg-green-600 px-3 py-1 rounded-md text-sm">Approve</button><button onClick={() => downloadMedia(item.url)} className="bg-blue-600 px-3 py-1 rounded-md text-sm">Download</button><button onClick={() => handleRejectMedia(item.id, item.url)} className="bg-red-600 px-3 py-1 rounded-md text-sm">Reject</button></div></div> ))}</div></section>

        <section className="mb-12 p-6 bg-gray-800 rounded-lg shadow-md"><h3 className="text-3xl font-bold text-stone-200 mb-6">Approved Media</h3><div className="overflow-x-auto"><table className="min-w-full bg-gray-900"><thead><tr className="bg-gray-700 text-left text-lg"><th className="p-3">Preview</th><th className="p-3">Guest Code</th><th className="p-3">URL</th><th className="p-3">Action</th></tr></thead><tbody>{media.filter(m => m.approved).map(item => (<tr key={item.id} className="border-b border-gray-700"><td className="p-2">{item.type === 'image' ? <img src={item.url} alt="Approved media" className="w-24 h-16 object-cover rounded"/> : <video src={item.url} className="w-24 h-16 object-cover rounded" />}</td><td className="p-3">{item.guestCode}</td><td className="p-3 truncate max-w-xs"><a href={item.url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{item.url}</a></td><td className="p-3"><button onClick={() => handleRejectMedia(item.id, item.url)} className="bg-red-600 px-3 py-1 rounded-md text-sm">Remove</button></td></tr>))}</tbody></table></div></section>
        
        <section className="mb-12 p-6 bg-gray-800 rounded-lg shadow-md"><h3 className="text-3xl font-bold text-stone-200 mb-6">Pending Duas for Review</h3><div className="overflow-x-auto"><table className="min-w-full bg-gray-900"><thead><tr className="bg-gray-700 text-left text-lg"><th className="p-3">Name</th><th className="p-3">Guest Code</th><th className="p-3">Message</th><th className="p-3">Status</th><th className="p-3">Action</th></tr></thead><tbody>{duas.filter(d => d.status === 'pending').map(dua => (<tr key={dua.id} className="border-b border-gray-700"><td className="p-3">{dua.name}</td><td className="p-3">{dua.guestCode}</td><td className="p-3 truncate max-w-sm">{dua.message}</td><td className="p-3"><span className="px-2 py-1 rounded-full text-sm bg-yellow-900 text-yellow-200">Pending</span></td><td className="p-3 space-x-2"><button onClick={() => updateDuaStatus(dua.id, 'approved')} className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">Approve</button><button onClick={() => updateDuaStatus(dua.id, 'rejected')} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Reject</button></td></tr>))}</tbody></table></div></section>

        <section className="mb-12 p-6 bg-gray-800 rounded-lg shadow-md"><h3 className="text-3xl font-bold text-stone-200 mb-6">RSVP Responses</h3><div className="overflow-x-auto"><table className="min-w-full bg-gray-900"><thead><tr className="bg-gray-700 text-left text-lg"><th className="p-3">Full Name</th><th className="p-3">Coming From?</th><th className="p-3">Code</th><th className="p-3">Attending</th><th className="p-3">Guests</th><th className="p-3">Events</th><th className="p-3">Message</th></tr></thead><tbody>{rsvps.map(rsvp => (<tr key={rsvp.id} className="border-b border-gray-700"><td className="p-3">{rsvp.fullName}</td><td className="p-3">{rsvp.comingFrom}</td><td className="p-3">{rsvp.guestCode}</td><td className="p-3">{rsvp.attending}</td><td className="p-3">{rsvp.guests}</td><td className="p-3">{rsvp.eventsAttending && typeof rsvp.eventsAttending === 'string' && JSON.parse(rsvp.eventsAttending).join(', ')}</td><td className="p-3 truncate max-w-xs">{rsvp.message}</td></tr>))}</tbody></table></div></section>

        <section className="p-6 bg-gray-800 rounded-lg shadow-md"><h3 className="text-3xl font-bold text-stone-200 mb-6">Archived Duas</h3><div className="overflow-x-auto"><table className="min-w-full bg-gray-900"><thead><tr className="bg-gray-700 text-left text-lg"><th className="p-3">Name</th><th className="p-3">Message</th><th className="p-3">Status</th></tr></thead><tbody>{duas.filter(d => d.status === 'rejected').map(dua => (<tr key={dua.id} className="border-b border-gray-700"><td className="p-3">{dua.name}</td><td className="p-3 truncate max-w-sm">{dua.message}</td><td className="p-3"><span className="px-2 py-1 rounded-full text-sm bg-red-900 text-red-200">Rejected</span></td></tr>))}</tbody></table></div></section>
      </div>
    </div>
  );
};

// --- Main App Component ---
const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [guestCode, setGuestCode] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(true);
  const [loginRedirectPath, setLoginRedirectPath] = useState('gallery');
  
  const handleLogin = (code) => { setGuestCode(code); if (code === ADMIN_CODE) setIsAdmin(true); };
  const handleLogout = () => { setGuestCode(null); setIsAdmin(false); setCurrentPage('home'); };

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage setCurrentPage={setCurrentPage} isAdmin={isAdmin} guestCode={guestCode} handleLogout={handleLogout} />;
      case 'eventDetails': return <EventDetailsPage guestCode={guestCode} setCurrentPage={setCurrentPage} setLoginRedirectPath={setLoginRedirectPath} />;
      case 'rsvp': return <RSVPPage guestCode={guestCode} setCurrentPage={setCurrentPage} setLoginRedirectPath={setLoginRedirectPath} />;
      case 'accommodation': return <AccommodationPage guestCode={guestCode} setCurrentPage={setCurrentPage} setLoginRedirectPath={setLoginRedirectPath} isAdmin={isAdmin} />;
      case 'giftRegistry': return <GiftRegistryPage guestCode={guestCode} setCurrentPage={setCurrentPage} setLoginRedirectPath={setLoginRedirectPath} />;
      case 'gallery': return <GalleryPage guestCode={guestCode} setCurrentPage={setCurrentPage} setLoginRedirectPath={setLoginRedirectPath} isAdmin={isAdmin} />;
      case 'contact': return <ContactPage />;
      case 'login': return <LoginPage handleLogin={handleLogin} setCurrentPage={setCurrentPage} loginRedirectPath={loginRedirectPath} />;
      case 'adminPanel': return isAdmin ? <AdminPanelPage /> : <HomePage setCurrentPage={setCurrentPage} isAdmin={isAdmin} guestCode={guestCode} handleLogout={handleLogout} />;
      default: return <HomePage setCurrentPage={setCurrentPage} isAdmin={isAdmin} guestCode={guestCode} handleLogout={handleLogout} />;
    }
  };

  return (
    <div className="font-sans antialiased bg-black">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Finger+Paint&family=Nanum+Myeongjo&family=Quintessential&family=Satisfy&display=swap'); body { font-family: 'Quintessential', cursive; background-color: #000; } .font-nanum-myeongjo { font-family: 'Nanum Myeongjo', serif; } .font-satisfy { font-family: 'Satisfy', cursive; } .font-finger-paint { font-family: 'Finger Paint', cursive; }`}</style>
      <Modal isOpen={showLoginModal && !guestCode && currentPage === 'home'} onClose={() => setShowLoginModal(false)}>
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4 text-center text-stone-100">Welcome!</h3>
          <p className="text-lg text-gray-300 mb-6">Please log in to access all features of our website.</p>
          <div className="flex justify-center space-x-4">
            <button 
              onClick={() => { 
                setShowLoginModal(false); 
                setLoginRedirectPath('home'); // Set redirect path to home
                setCurrentPage('login'); 
              }} 
              className="bg-stone-200 text-black px-6 py-2 rounded-lg font-semibold"
            >
              Login
            </button>
            <button onClick={() => setShowLoginModal(false)} className="bg-gray-600 text-white px-6 py-2 rounded-lg font-semibold">Skip for now</button>
          </div>
        </div>
      </Modal>
      {currentPage !== 'home' && <Navbar setCurrentPage={setCurrentPage} handleLogout={handleLogout} isAdmin={isAdmin} guestCode={guestCode} />}
      <main>{renderPage()}</main>
    </div>
  );
};

export default App;

