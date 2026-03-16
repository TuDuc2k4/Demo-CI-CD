USE BTChieu2;

CREATE TABLE IF NOT EXISTS posts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    author VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO posts (title, content, author)
VALUES
('Welcome to My Portfolio', 'This is the first post on my portfolio blog. Stay tuned for more updates and technical content!', 'Admin'),
('Building a Full-Stack Java App', 'In this post, I share how I built a full-stack application using Spring Boot, MySQL, and Vanilla JS.', 'Admin'),
('Learning Spring Boot', 'Spring Boot makes it easy to create stand-alone, production-grade Spring applications. Here are some tips and tricks I have learned.', 'Admin');

