package com.example.demo.model;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QCreationImage is a Querydsl query type for CreationImage
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QCreationImage extends EntityPathBase<CreationImage> {

    private static final long serialVersionUID = 362358237L;

    public static final QCreationImage creationImage = new QCreationImage("creationImage");

    public final NumberPath<Long> bookId = createNumber("bookId", Long.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath imageUrl = createString("imageUrl");

    public final NumberPath<Long> userId = createNumber("userId", Long.class);

    public QCreationImage(String variable) {
        super(CreationImage.class, forVariable(variable));
    }

    public QCreationImage(Path<? extends CreationImage> path) {
        super(path.getType(), path.getMetadata());
    }

    public QCreationImage(PathMetadata metadata) {
        super(CreationImage.class, metadata);
    }

}

