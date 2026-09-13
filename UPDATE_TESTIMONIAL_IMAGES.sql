-- Update testimonial images for Xantoz, Aakriti, and Ranjan

-- Update Xantoz Vandaree image
UPDATE public.testimonials 
SET img = 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi-HIimdhZS2aeHSRM4-cGsez-nkaYJfIeaRpava4zbonjDwcPa0fn70UtA9FhxRltaCDIG8jYBBdFjre9CC5NopTArLH8yvSUTTBMEV6PnODwagQZ9zVXST0dAKYrVbfLOsUEjzEOr9LPnfhJCKTQnGdlTnC0cDKLiQB-VQDui8KVh0fN0ro70OhbpSGE/s320/Xantoz%20Vandaree.png'
WHERE name = 'Xantoz Vandaree';

-- Update Aakriti Kharel image
UPDATE public.testimonials 
SET img = 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEirMCftuTp_wgUxedmzfey7nDIy5nnpOuUE6md0jHh8i77G2nxSLSiD6WFE6yBy-mg8aODG6SfeSBR0xtLPmtjkeZ4uWGBOo-E6024Q1xFylAcKA-VvNxMRq6lCsarf61mYY90lYWMQwQd8im26hsmIZOLME7SvO44Aoazt2kD-GMLM4OsMMEz3eFUeN0U/s320/Aakriti%20Kharel.png'
WHERE name = 'Aakriti Kharel';

-- Update Ranjan Kushwaha image
UPDATE public.testimonials 
SET img = 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgnUdqRoG0U1KJmO4eVCo5D9naWEzLiDwUhf9tb8yK3UNya-5ylVuBmtHH16fZJiyX6cx8Z5MesfkyxQASWrsQkm4eek6rfRJLe8hrYU3n9Isk5D5pMfc_omAnvsyq5UrexALUBjd6eTVL_lH3NcaUXyc2XBoSUQy-uKuzwBrWCpFDW8cSMAo_vUw8_H-Q/s320/Ranjan%20Kushwaha.png'
WHERE name = 'Ranjan Kushwaha';

-- Verify the updates
SELECT name, img FROM public.testimonials ORDER BY sort_order;
