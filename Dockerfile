FROM node:lts AS runtime

RUN wget https://repo.anaconda.com/miniconda/Miniconda3-py310_23.10.0-1-Linux-x86_64.sh
RUN mkdir /root/.conda
ENV PATH="/root/miniconda3/bin:${PATH}"
ARG PATH="/root/miniconda3/bin:${PATH}"
RUN bash Miniconda3-py310_23.10.0-1-Linux-x86_64.sh -b
RUN rm -f Miniconda3-py310_23.10.0-1-Linux-x86_64.sh
RUN conda init bash
RUN . /root/.bashrc
RUN conda update conda

RUN conda install -c conda-forge ffmpeg libsndfile
RUN pip install spleeter
RUN pip install basic-pitch

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321
CMD node ./dist/server/entry.mjs
