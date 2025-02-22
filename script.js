// Testimonial Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('testimonialCarousel');
    const authorThumbnails = document.querySelectorAll('.author-thumbnail');
    
    if (carousel) {
        // Initialize Bootstrap carousel
        const testimonialCarousel = new bootstrap.Carousel(carousel, {
            interval: 5000,
            wrap: true
        });

        // Handle author thumbnail clicks
        authorThumbnails.forEach((thumbnail, index) => {
            thumbnail.addEventListener('click', () => {
                testimonialCarousel.to(index);
                
                // Update active state of thumbnails
                authorThumbnails.forEach(thumb => thumb.classList.remove('active'));
                thumbnail.classList.add('active');
            });
        });

        // Update thumbnail active state on carousel slide
        carousel.addEventListener('slide.bs.carousel', (event) => {
            const activeIndex = event.to;
            authorThumbnails.forEach((thumbnail, index) => {
                if (index === activeIndex) {
                    thumbnail.classList.add('active');
                } else {
                    thumbnail.classList.remove('active');
                }
            });
        });
    }
}); 