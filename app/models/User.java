package models;

import models.utils.AppException;
import models.utils.Hash;
import play.data.format.Formats;
import play.data.validation.Constraints;
import play.db.ebean.Model;
import play.Logger;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Date;

import play.modules.mongodb.jackson.MongoDB;
import net.vz.mongodb.jackson.DBCursor;
import net.vz.mongodb.jackson.JacksonDBCollection;
import net.vz.mongodb.jackson.WriteResult;
import net.vz.mongodb.jackson.DBQuery;

/**
 * User: yesnault
 * Date: 20/01/12
 */
@Entity
public class User extends Model {

    @Id
    public Long id;

    @Constraints.Required
    @Formats.NonEmpty
    @Column(unique = true)
    public String email;

    @Constraints.Required
    @Formats.NonEmpty
    @Column(unique = true)
    public String fullname;

    public String confirmationToken;

    @Constraints.Required
    @Formats.NonEmpty
    public String passwordHash;

    @Formats.DateTime(pattern = "yyyy-MM-dd HH:mm:ss")
    public Date dateCreation;

    @Formats.NonEmpty
    public Boolean validated = false;

    public static JacksonDBCollection<User, Long> coll = MongoDB.getCollection("users", User.class, Long.class);
    
    // -- Queries (long id, user.class)
    public static Model.Finder<Long, User> find = new Model.Finder<Long, User>(Long.class, User.class);

    /**
     * Retrieve a user from an email.
     *
     * @param email email to search
     * @return a user
     */
    public static User findByEmail(String email) {
    	DBCursor<User> cursor = coll.find(DBQuery.is("email", email));
    	if (cursor.hasNext()) {
    		User foundUser = cursor.next();
    		Logger.info(foundUser.email.toString());
    	} else {
    		Logger.info("no user found");
    	}
        return find.where().eq("email", email).findUnique();
    }
    
    //mongo method
    public static User mfindByEmail(String email) {
    	DBCursor<User> cursor = coll.find(DBQuery.is("email", email));
    	if (cursor.hasNext()) {
    		User foundUser = cursor.next();
    		Logger.info(foundUser.email.toString());
    		return foundUser;
    	} else {
    		Logger.info("no user found");
    		return null;
    	}
    }

    /**
     * Retrieve a user from a fullname.
     *
     * @param fullname Full name
     * @return a user
     */
    public static User findByFullname(String fullname) {
    	DBCursor<User> cursor = coll.find(DBQuery.is("fullname", fullname));
    	if (cursor.hasNext()) {
    		User foundUser = cursor.next();
        	Logger.info(foundUser.fullname.toString());
    	} else {
    		Logger.info("no user found");
    	}
        return find.where().eq("fullname", fullname).findUnique();
    }

    /**
     * Retrieves a user from a confirmation token.
     *
     * @param token the confirmation token to use.
     * @return a user if the confirmation token is found, null otherwise.
     */
    public static User findByConfirmationToken(String token) {
    	DBCursor<User> cursor = coll.find(DBQuery.is("confirmationToken", token));
    	if (cursor.hasNext()) {
    		User foundUser = cursor.next();
    		Logger.info(foundUser.confirmationToken.toString());
    	} else {
    		Logger.info("no user found");
    	}
        return find.where().eq("confirmationToken", token).findUnique();
    }


//    SAMPLE JACKSON METHODS
//    
//    private static JacksonDBCollection<User, String> db() {
//    	return MongoDB.getCollection("users", User.class, String.class);
//    }
//
//    public static User findById(String id) {
//    	return db().findOneById(id);
//    }
//
//    public static User findByEmail(String email) {
//    	return db().findOne(DBQuery.is("email", email));
//    }
    
    /**
     * Authenticate a User, from a email and clear password.
     *
     * @param email         email
     * @param clearPassword clear password
     * @return User if authenticated, null otherwise
     * @throws AppException App Exception
     */
    public static User authenticate(String email, String clearPassword) throws AppException {
    	DBCursor<User> cursor = coll.find(DBQuery.is("email", email));
    	if (cursor.hasNext()) {
    		User foundUser = cursor.next();
    		Logger.info(foundUser.email.toString());
    	} else {
    		Logger.info("no user found");
    	}
        // get the user with email only to keep the salt password
        User user = find.where().eq("email", email).findUnique();
        if (user != null) {
            // get the hash password from the salt + clear password
            if (Hash.checkPassword(clearPassword, user.passwordHash)) {
              return user;
            }
        }
        return null;
    }

    public void changePassword(String password) throws AppException {
        this.passwordHash = Hash.createPassword(password);
        this.save();
    }

    /**
     * Confirms an account.
     *
     * @return true if confirmed, false otherwise.
     * @throws AppException App Exception
     */
    public static boolean confirm(User user) throws AppException {
        if (user == null) {
          return false;
        }
        user.confirmationToken = null;
        user.validated = true;
        user.save();
        User.coll.save(user);
        return true;
    }

}
