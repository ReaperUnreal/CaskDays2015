package com.bigvikinggames.animoji.service;

import com.bigvikinggames.animoji.Config;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.nio.file.Files;
import javax.imageio.ImageIO;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.EntityTag;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Request;
import javax.ws.rs.core.Response;
import javax.xml.bind.DatatypeConverter;
import org.apache.commons.codec.digest.DigestUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Path("/images")
public class ImageService {

	/**
	 * Logger instance
	 */
	private static final Logger logger = LoggerFactory.getLogger(ImageService.class);

	/**
	 * The config for the server.
	 */
	private final Config config;

	public ImageService(Config config) {
		this.config = config;
	}

	@GET
	@Produces({"image/png"})
	@Path("/{imageName}")
	public Response getImage(@PathParam("imageName") String imageName, @Context Request request) {
		java.nio.file.Path filePath = config.getUserImagePath().resolve(imageName + ".png");
		logger.info("Getting file: {}", filePath.toString());
		byte[] imageBytes;
		try {
			imageBytes = Files.readAllBytes(filePath);
		} catch (IOException ex) {
			logger.error("Could not read file {}: {}", imageName, ex.getLocalizedMessage());
			return Response.serverError().build();
		}

		EntityTag etag = new EntityTag(DigestUtils.md5Hex(imageBytes));

		Response.ResponseBuilder responseBuilder = request.evaluatePreconditions(etag);
		if (responseBuilder != null) {
			return responseBuilder.build();
		}

		return Response.ok().tag(etag).type("image/png").entity(imageBytes).build();
	}

	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/{imageName}")
	public Response saveImage(@PathParam("imageName") String imageName, ImageData imageData) {
		java.nio.file.Path filePath = config.getUserImagePath().resolve(imageName + ".png");
		logger.info("Saving file: {}", filePath.toString());
		String imageDataStr = imageData.data;
		byte[] imageBytes = DatatypeConverter.parseBase64Binary(imageDataStr.substring(imageDataStr.indexOf(",") + 1));
		BufferedImage image;
		try {
			image = ImageIO.read(new ByteArrayInputStream(imageBytes));
		} catch (IOException ex) {
			logger.error("Could not read image bytes {}: {}", imageName, ex.getLocalizedMessage());
			return Response.serverError().build();
		}
		try {
			ImageIO.write(image, "png", filePath.toFile());
		} catch (IOException ex) {
			logger.error("Could not write PNG {}: {}", imageName, ex.getLocalizedMessage());
		}
		ImageStoreResponse response = new ImageStoreResponse();
		response.storedName = imageName;
		return Response.ok(response).build();
	}
}
