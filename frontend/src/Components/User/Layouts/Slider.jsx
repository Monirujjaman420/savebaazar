const Slider = () => {
    return (
        <section>

            <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img class="d-block w-100 " style={{ height:"500px" }} src="https://img.freepik.com/free-vector/shopping-time-banner-with-realistic-map-cart-gift-bags-vector-illustration_548887-120.jpg" alt="First slide" />
                    </div>
                    <div class="carousel-item">
                        <img class="d-block w-100 " style={{ height:"500px" }} src="https://imgs.search.brave.com/3h5s-BkkHHMmmHPEGrbvKzywHJHdFXJ809O26osXn_E/rs:fit:948:225:1/g:ce/aHR0cHM6Ly90c2Uz/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC54/am54M0h5bVFzTTV6/ejlfRTlncHZ3SGFE/dCZwaWQ9QXBp" alt="Second slide" />
                    </div>
                    <div class="carousel-item">
                        <img class="d-block w-100 " style={{ height:"500px" }} src="https://imgs.search.brave.com/WLVPC4YqmfhHiw1cBW_JWQSx165rROlkdCim36yU4g4/rs:fit:905:225:1/g:ce/aHR0cHM6Ly90c2Uy/Lm1tLmJpbmcubmV0/L3RoP2lkPU9JUC45/eExYZFNkZnVpSEJD/ZG5tY2ljNU9nSGFE/NCZwaWQ9QXBp" alt="Third slide" />
                    </div>
                </div>
                <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>
        </section>
    )
}
export default Slider